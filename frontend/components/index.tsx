import * as React from "react"
import * as ReactDom from "react-dom"

import Hello from "./Comp"

export default class Index {
  public static loadComponent(){
    document.addEventListener("DOMContentLoaded", () => {
      ReactDom.render(
        <Hello compiler="typescript" framework="React" />,
        document.getElementById("ex")
      )
    })
  }
}
