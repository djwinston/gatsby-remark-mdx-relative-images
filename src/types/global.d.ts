
import { Node, Actions, Reporter } from "gatsby";

declare global {

  type MdxFrontmatter = {
    [key: string]: string | boolean | number
  }

  type NodeMdx = Node & {
    internal: Node["internal"] & {
      counter: number
    }
    body: string
    frontmatter: MdxFrontmatter
    fileAbsolutePath: string;
  }

  type GatsbyPluginNode = Node & {
    absolutePath: string;
    sourceInstanceName: string;
    name: string;
    version: string;
  };

  type GatsbyPluginOptions = {
    staticFolderName: string;
    include: string[];
    exclude: string[];
  };

  type GatsbyPluginArgs = {
    node: NodeMdx;
    getNodesByType: (type: string) => GatsbyPluginNode[];
    actions: Actions;
    reporter: Reporter
  };
}

export { }