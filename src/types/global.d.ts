
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
  }

  type GatsbyFile = Node & {
    absolutePath: string;
    sourceInstanceName: string;
  };

  type PluginOptions = {
    staticFolderName: string;
    include: string[];
    exclude: string[];
  };

  type GatsbyPluginArgs = {
    node: NodeMdx;
    getNodesByType: (type: string) => GatsbyFile[];
    actions: Actions;
    reporter: Reporter
  };
}

export { }