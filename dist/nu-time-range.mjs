var h = (s) => {
  throw TypeError(s);
};
var m = (s, n, t) => n.has(s) || h("Cannot " + t);
var r = (s, n, t) => (m(s, n, "read from private field"), t ? t.call(s) : n.get(s)), d = (s, n, t) => n.has(s) ? h("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(s) : n.set(s, t), l = (s, n, t, a) => (m(s, n, "write to private field"), a ? a.call(s, t) : n.set(s, t), t);
import "./nu-time-input.mjs";
var o, i;
class c extends HTMLElement {
  constructor() {
    super();
    d(this, o, null);
    d(this, i, null);
    let t = this.attachShadow({ mode: "open" }), a = document.createElement("template");
    a.innerHTML = `
			<style>
				:host{
					--selection-selected-bg-color: rgb(0, 117, 155);
					--selection-selected-color: white;
					--selection-hover-bg-color: rgb(178, 213, 255);
					--selection-hover-color: white;
					color: #333;

				}
				div{
					display: inline-flex
				}
			</style>
			<div>
				<slot id="before"></slot>
				<nu-time-input id="start" value="00:00"></nu-time-input>
				<slot name="center"><span>~</span></slot>
				<nu-time-input id="end" value="00:00"></nu-time-input>
				<slot id="after"></slot>
			</div>
		`, t.appendChild(document.importNode(a.content, !0));
  }
  toString() {
    return "[object NuTimeRangeElement]";
  }
  static get observedAttributes() {
    return [
      "start-name",
      "end-name",
      "start-value",
      "end-value",
      "classes",
      "styles",
      "disabled",
      "readonly",
      "nonce"
    ];
  }
  get startName() {
    return this.shadowRoot.getElementById("start").name;
  }
  set startName(t) {
    this.setAttribute("start-name", t);
  }
  get endName() {
    return this.shadowRoot.getElementById("end").name;
  }
  set endName(t) {
    this.setAttribute("end-name", t);
  }
  get startValue() {
    return this.shadowRoot.getElementById("start").value;
  }
  set startValue(t) {
    this.setAttribute("start-value", t);
  }
  get endValue() {
    return this.shadowRoot.getElementById("end").value;
  }
  set endValue(t) {
    this.setAttribute("end-name", t);
  }
  set disabled(t) {
    t === !0 || t === 1 || typeof t == "string" && t.toLowerCase() == "disabled" ? this.setAttribute("disabled", "disabled") : this.removeAttribute("disabled");
  }
  set readonly(t) {
    t === !0 || t === 1 || typeof t == "string" && t.toLowerCase() == "readonly" ? this.setAttribute("readonly", "readonly") : this.removeAttribute("readonly");
  }
  get disabled() {
    return this.getAttribute("disabled") != null && (this.getAttribute("disabled") === "" || (this.getAttribute("disabled") || "").toLowerCase() == "disabled");
  }
  get readonly() {
    return this.getAttribute("readonly") != null && (this.getAttribute("readonly") === "" || (this.getAttribute("readonly") || "").toLowerCase() == "readonly");
  }
  set nonce(t) {
    this.setAttribute("nonce", "n");
  }
  get nonce() {
    return this.getAttribute("nonce");
  }
  attributeChangedCallback(t, a, e) {
    switch (t) {
      case "start-name":
        this.shadowRoot.getElementById("start").setAttribute("name", e);
        break;
      case "end-name":
        this.shadowRoot.getElementById("end").setAttribute("name", e);
        break;
      case "start-value":
        (e + "").match(/\d{2}:\d{2}/) && (this.shadowRoot.getElementById("start").value = e, this.shadowRoot.getElementById("end").min = e);
        break;
      case "end-value":
        (e + "").match(/\d{2}:\d{2}/) && (this.shadowRoot.getElementById("end").value = e);
        break;
      case "classes":
        this.shadowRoot.getElementById("start").className = e, this.shadowRoot.getElementById("end").className = e;
        break;
      case "styles":
        this.shadowRoot.getElementById("start").cssText = e, this.shadowRoot.getElementById("end").cssText = e;
        break;
      case "readonly":
      case "disabled":
        this.shadowRoot.getElementById("start").setAttribute(t, e), this.shadowRoot.getElementById("end").setAttribute(t, e);
        break;
      case "nonce":
        this.shadowRoot.querySelectorAll("style, script, nu-time-input").forEach(function(u) {
          u.setAttribute("nonce", e);
        });
        break;
    }
  }
  connectedCallback() {
    let t = this;
    l(this, i, function(e) {
      e instanceof FormDataEvent && t.startName && t.endName && (e.formData.append(t.startName, t.startValue), e.formData.append(t.endName, t.endValue));
    });
    let a = this;
    for (; a && (a = a.parentNode, !!a); )
      if (a.tagName == "FORM") {
        l(this, o, a), a.addEventListener("formdata", r(this, i));
        break;
      }
  }
  disconnectedCallback() {
    r(this, o) && r(this, o).removeEventListener("formdata", r(this, i));
  }
}
o = new WeakMap(), i = new WeakMap();
customElements.define("nu-time-input-group", c);
