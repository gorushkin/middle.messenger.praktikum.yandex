import type { Block } from "./block";

export type BlockConstructor = new () => Block;

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.getElementById(query) as HTMLElement;

  if (!root) {
    throw new Error(`Root element not found by selector: ${query}`);
  }

  root.appendChild(block.getContent());
  return root;
}

interface RouteProps {
  rootQuery: string;
}

export class Route {
  private _pathname: string;
  private _blockClass: BlockConstructor;
  private _block: Block | null;
  private _props: RouteProps;

  constructor(pathname: string, view: BlockConstructor, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.getContent().remove();
    }
  }

  match(pathname: string) {
    if (this._pathname === "/*") {
      return true;
    }
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }

    render(this._props.rootQuery, this._block);
  }
}
