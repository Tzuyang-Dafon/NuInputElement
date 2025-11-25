var l = (c) => {
  throw TypeError(c);
};
var b = (c, t, e) => t.has(c) || l("Cannot " + e);
var n = (c, t, e) => (b(c, t, "read from private field"), e ? e.call(c) : t.get(c)), s = (c, t, e) => t.has(c) ? l("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(c) : t.set(c, e), h = (c, t, e, o) => (b(c, t, "write to private field"), o ? o.call(c, e) : t.set(c, e), e);
var i, a;
class u extends HTMLElement {
  constructor() {
    super();
    s(this, i, null);
    s(this, a, null);
    this.role = "textbox";
  }
  static get observedAttributes() {
    return ["name", "value", "disabled", "readonly", "nonce", "checked"];
  }
  set disabled(e) {
    e === !0 || e === 1 || typeof e == "string" && e.toLowerCase() == "disabled" ? this.setAttribute("disabled", "disabled") : this.removeAttribute("disabled");
  }
  set readonly(e) {
    e === !0 || e === 1 || typeof e == "string" && e.toLowerCase() == "readonly" ? this.setAttribute("readonly", "readonly") : this.removeAttribute("readonly");
  }
  get disabled() {
    return this.getAttribute("disabled") != null && (this.getAttribute("disabled") === "" || (this.getAttribute("disabled") || "").toLowerCase() == "disabled");
  }
  get readonly() {
    return this.getAttribute("readonly") != null && (this.getAttribute("readonly") === "" || (this.getAttribute("readonly") || "").toLowerCase() == "readonly");
  }
  set nonce(e) {
    this.setAttribute("nonce", "n");
  }
  get nonce() {
    return this.getAttribute("nonce");
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  get checked() {
    return !1;
  }
  set value(e) {
    this.setAttribute("value", e);
  }
  get value() {
    return this.getAttribute("value") !== "" ? this.getAttribute("value") : "on";
  }
  toString() {
    return "[object NuToggleInputElement]";
  }
  connectedCallback() {
    let e = this;
    h(this, a, function(r) {
      r instanceof FormDataEvent && e.name != "" && e.checked && e.value && r.formData.append(e.name, e.value);
    });
    let o = this;
    for (; o && (o = o.parentNode, !!o); )
      if (o.tagName == "FORM") {
        h(this, i, o), o.addEventListener("formdata", n(this, a));
        break;
      }
  }
  disconnectedCallback() {
    n(this, i) && n(this, i).removeEventListener("formdata", n(this, a));
  }
  attributeChangedCallback(e, o, r) {
    switch (e) {
      case "nonce":
        this.shadowRoot && this.shadowRoot.querySelectorAll("style, script").forEach(function(d) {
          d.setAttribute("nonce", r);
        });
        break;
    }
  }
}
i = new WeakMap(), a = new WeakMap();
class k extends u {
  toString() {
    return "[object NuCheckboxElement]";
  }
  constructor() {
    super();
    let t = this, e = this.attachShadow({ mode: "open" }), o = document.createElement("template");
    o.innerHTML = `
		<style>
			:host{
				--label-font-size: 1rem;
			
				--checkbox-width: 2.5rem;
				--checkbox-height: var(--label-font-size);
				--checkbox-outline-size: 0.2rem;
				--checkbox-background: gray;
				--checkbox-inner-background: white;
				
				--checkbox-text-space: .5rem;

				--checkbox-checked-background: darkgreen;
				--checkbox-checked-inner-background: var(--checkbox-inner-background);
			}

			main label{
				display: flex;
				column-gap: var(--checkbox-text-space);
				height: var(--checkbox-height);
				
				align-items: center;
			}
			#checkbox-outer{
				display: block;
				width: var(--checkbox-width);
				background-color: var(--checkbox-background);
				height: var(--checkbox-height);
				
				outline-width: var(--checkbox-outline-size);
				outline-style: solid;
				outline-offset: 0;
				outline-color: var(--checkbox-background);
				
				
				border-radius: var(--checkbox-height);
			}
			#checkbox-inner{
				background-color: var(--checkbox-inner-background);
				height: var(--checkbox-height);
				width: var(--checkbox-height);
				display: block;
				border-radius: 50%;
				
				margin-left: 0;
				
				transition: margin .5s;
			}
			main{
				font-size: var(--label-font-size);
				font-family: sans-serif
			}
			::slotted([slot=label]){
				font-size: var(--label-font-size);
				font-family: sans-serif
			}
			input[type=checkbox]{
				display: none
			}
			
			input[type=checkbox]:checked ~ label #checkbox-outer #checkbox-inner{
				margin-left: auto;		
			}

			input[type=checkbox]:checked ~ label #checkbox-outer{
				background-color: var(--checkbox-checked-background);
				outline-color: var(--checkbox-checked-background);
			}
			input[type=checkbox]:checked ~ label #checkbox-outer #checkbox-inner{
				background-color: var(--checkbox-checked-inner-background)
			}
		</style>
		<main id="checkbox-content">
			<input type="checkbox" id="cb"/>
			<label for="cb">
				<span id="checkbox-outer">
					<span id="checkbox-inner"></span>
				</span>
				<slot name="label"></slot>
			</label>
		</main>
		`, e.appendChild(document.importNode(o.content, !0)), t.role = "checkbox";
  }
  static get observedAttributes() {
    return [...super.observedAttributes];
  }
  set checked(t) {
    t == "checked" || t === !0 || t === 1 ? this.setAttribute("checked", "") : this.removeAttribute("checked");
  }
  get checked() {
    return this.shadowRoot.querySelector("[type=checkbox]").checked;
  }
  attributeChangedCallback(t, e, o) {
    switch (super.attributeChangedCallback(t, e, o), t) {
      case "disabled":
      case "readonly":
        o === "" || (o || "").toLowerCase() == t.toLowerCase() ? (this.shadowRoot.getElementById("checkbox-content").classList.add(t), this.shadowRoot.querySelector("[type=checkbox]")[t] = !0) : (this.shadowRoot.getElementById("checkbox-content").classList.remove(t), this.shadowRoot.querySelector("[type=checkbox]")[t] = !1);
        break;
      case "checked":
        let r = o == "checked" || o === "";
        this.shadowRoot.querySelector("checkbox").checked = r, this.ariaChecked = r;
        break;
    }
  }
}
customElements.define("nu-checkbox", k);
