import {Constants} from "../constants";
import {setContentTheme} from "../ui/setContentTheme";
import {getEventName} from "../util/compatibility";
import {MenuItem} from "./MenuItem";
import {hidePanel, toggleSubMenu} from "./setToolbar";

export class ContentTheme extends MenuItem {
    public element: HTMLElement;

    constructor(vditor: IVditor, menuItem: IMenuItem) {
        super(vditor, menuItem);

        const actionBtn = this.element.children[0] as HTMLElement;

        const panelElement = document.createElement("div");
        panelElement.className = `vditor-hint${menuItem.level === 2 ? "" : " vditor-panel--arrow"}`;
        let innerHTML = "";
        Constants.CONTENT_THEME.forEach((theme) => {
            innerHTML += `<button>${theme}</button>`;
        });
        panelElement.innerHTML =
            `<div style="overflow: auto;max-height:${window.innerHeight / 2}px">${innerHTML}</div>`;
        panelElement.addEventListener(getEventName(), (event: MouseEvent & { target: HTMLElement }) => {
            if (event.target.tagName === "BUTTON") {
                hidePanel(vditor, ["subToolbar"]);
                vditor.options.preview.markdown.theme = event.target.textContent;
                setContentTheme(event.target.textContent, vditor.options.cdn);
                event.preventDefault();
                event.stopPropagation();
            }
        });
        this.element.appendChild(panelElement);

        toggleSubMenu(vditor, panelElement, actionBtn, menuItem.level);
    }
}
