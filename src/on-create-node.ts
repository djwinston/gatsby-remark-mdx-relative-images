import path from 'node:path';
import traverse from 'traverse';
import { slash, findMatchingFile } from './utils'

export const defaultPluginOptions: GatsbyPluginOptions = {
  staticFolderName: 'static',
  include: [],
  exclude: [],
};

export const onCreateNode = (
  { node, getNodesByType, reporter }: GatsbyPluginArgs,
  pluginOptions: GatsbyPluginOptions,
) => {
  const options = { ...defaultPluginOptions, ...pluginOptions };

  if (node.internal.type === `Mdx`) {
    const files = getNodesByType(`File`).filter(node => node.internal.mediaType?.includes('image'));
    const mdxPlugin = getNodesByType('SitePlugin').filter(node => node.name === 'gatsby-plugin-mdx');
    const mdxVersion = mdxPlugin[0].version.split('.')[0]

    try {
      const directory = Number(mdxVersion) > 3 ? node.internal.contentFilePath : path.dirname(node.fileAbsolutePath)

      // Deeply iterate through frontmatter data for absolute paths
      traverse(node.frontmatter).forEach(function (value) {
        if (typeof value !== 'string') return;
        if (!path.isAbsolute(value) || !path.extname(value)) return;

        const paths = this.path.reduce<string[]>((acc, current) => {
          acc.push(acc.length > 0 ? [acc, current].join('.') : current);
          return acc;
        }, []);

        let shouldTransform = options.include.length < 1;

        if (options.include.some((a) => paths.includes(a))) {
          shouldTransform = true;
        }

        if (options.exclude.some((a) => paths.includes(a))) {
          shouldTransform = false;
        }

        if (!shouldTransform) return;

        const file = findMatchingFile(value, files, options);

        if (!directory) return reporter.panic('gatsby-remark-mdx-relative-images Error. Source directory is undefined')
        const newValue = slash(path.relative(directory, file.absolutePath));

        this.update(newValue);
      });
    } catch (error) {
      if (error instanceof Error) reporter.panic('gatsby-remark-relative-images Error', error)
    }
  }
};
