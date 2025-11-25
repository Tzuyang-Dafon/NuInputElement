var m = (n) => {
  throw TypeError(n);
};
var b = (n, t, e) => t.has(n) || m("Cannot " + e);
var d = (n, t, e) => (b(n, t, "read from private field"), e ? e.call(n) : t.get(n)), u = (n, t, e) => t.has(n) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), c = (n, t, e, o) => (b(n, t, "write to private field"), o ? o.call(n, e) : t.set(n, e), e);
var a, r;
class v extends HTMLElement {
  constructor() {
    super();
    u(this, a, null);
    u(this, r, null);
    this.role = "textbox";
  }
  static get observedAttributes() {
    return ["name", "value", "disabled", "readonly", "nonce"];
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
  toString() {
    return "[object NuInputElement]";
  }
  connectedCallback() {
    let e = this;
    c(this, r, function(s) {
      s instanceof FormDataEvent && s.formData.append(e.name, e.value);
    });
    let o = this;
    for (; o && (o = o.parentNode, !!o); )
      if (o.tagName == "FORM") {
        c(this, a, o), o.addEventListener("formdata", d(this, r));
        break;
      }
  }
  disconnectedCallback() {
    d(this, a) && d(this, a).removeEventListener("formdata", d(this, r));
  }
  attributeChangedCallback(e, o, s) {
    switch (e) {
      case "nonce":
        this.shadowRoot && this.shadowRoot.querySelectorAll("style, script").forEach(function(i) {
          i.setAttribute("nonce", s);
        });
        break;
    }
  }
}
a = new WeakMap(), r = new WeakMap();
class g extends v {
  toString() {
    return "[object NuTimeInputElement]";
  }
  constructor() {
    super();
    let t = this, e = this.attachShadow({ mode: "open" }), o = document.createElement("template");
    o.innerHTML = `
		<style>
			:host{
				--selection-selected-bg-color: rgb(0, 117, 155);
				--selection-selected-color: white;
				--selection-hover-bg-color: rgb(178, 213, 255);
				--selection-hover-color: white;
				writing-mode: horizontal-tb;
				text-rendering: auto;
				letter-spacing: normal;
				word-spacing: normal;
				line-height: normal;
				text-transform: none;
				text-indent: 0px;
				text-shadow: none;
				text-align: start;
				appearance: auto;
				background-color: field;
				margin: 0em;
				padding: 1px 2px;
				border-width: 2px;
				border-style: inset;
				border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
				display: inline-block;
				cursor: default;
			}
			#main #mask{
				display: none
			}
			#main.disabled{
				position: relative
			}
			#main.disabled #mask, #main.readonly #mask{
				width: 100%;
				height: 100%;

				display: block;

				position: absolute;
			}
			#main.disabled #mask{
				background-color: rgba(153, 153, 153, .75);
			}
			#main.readonly #mask{
				background-color: rgba(245, 245, 245, .75);
			}

			#main{
				position: relative;

				display: flex;
			}
			#hour, #minutes{
				border-style: hidden;
				border-width: 0;
				outline-style: none;
				outline-width: 0;
				width: 1.2em;
			}
			#time-colon{
				padding: 0 .25em;
			}
			#time-select-icon{
				font-size: 80%;
			}
			#time-select{
				position: absolute;
				top: 100%;
				left: 0;
				
				max-height: 12rem;
				justify-content: space-around;
				
				background-color: white;
				box-shadow: 1px 1px 6px #999;
			}
			#time-select[data-hide=true]{
				display: none;
			}
			#time-select[data-hide=false]{
				display: flex;
			}
			#hour-selection, #minute-selection{
				overflow-y: scroll;
				width: 8rem;
				text-align: center;
			}
			.select-option{
				height: 1rem;
				padding-top: .5rem;
				padding-bottom: .5rem;
			}
			.select-option:hover{
				background-color: var(--selection-hover-bg-color);
				color: var(--selection-hover-color);
			}
			.select-option.selected, .select-option.selected:hover{
				background-color: var(--selection-selected-bg-color);
				color: var(--selection-selected-color);
				font-weight: bolder
			}
		</style>
		<div id="main">
			<input id="hour" placeholder="- -" maxlength="2" data-max="24" data-min="0"/>
			<span id="time-colon">:</span>
			<input id="minutes" placeholder="- -" maxlength="2" data-max="60" data-min="0"/>
			<div id="time-select-icon"><slot name="select-icon">&#x1F551;</slot></div>
			<!-- time select -->
			<div id="time-select" data-hide="true">
				<div id="hour-selection"></div>
				<div id="minute-selection"></div>
			</div>
			<div id="mask"></div>
		</div>	
		`, e.appendChild(document.importNode(o.content, !0));
    for (let s = 0; s < 24; s++) {
      let i = document.createElement("div");
      i.innerHTML = `000${s}`.substr(-2), i.dataset.value = s, i.dataset.textValue = `000${s}`.substr(-2), i.classList.add("select-option"), e.querySelector("#hour-selection").appendChild(i);
    }
    for (let s = 0; s < 60; s++) {
      let i = document.createElement("div");
      i.innerHTML = `000${s}`.substr(-2), i.dataset.value = s, i.dataset.textValue = `000${s}`.substr(-2), i.classList.add("select-option"), e.querySelector("#minute-selection").appendChild(i);
    }
    this.addEventListener("focusout", function(s) {
    }), e.querySelectorAll("input").forEach(function(s) {
      s.addEventListener("input", function() {
        this.value = this.value.replace(/[^\d]/g, "");
      }), s.addEventListener("focusout", function() {
        this.value = ("000" + this.value).substr(-2);
      }), s.addEventListener("keydown", function(i) {
        let l = Number(this.value);
        switch (i.keyCode) {
          case 38:
            this.value = l + 1;
            break;
          case 40:
            this.value = l - 1;
            break;
          case 37:
            this.id == "minutes" && this.selectionStart == 0 && (e.getElementById("hour").focus(), e.getElementById("hour").selectionStart = -1, e.getElementById("hour").selectionEnd = -1);
            return;
          case 39:
            this.id == "hour" && this.selectionStart == 2 && (e.getElementById("minutes").selectionStart = 0, e.getElementById("minutes").selectionEnd = 0, e.getElementById("minutes").focus());
          default:
            return;
        }
        let h = new Date((/* @__PURE__ */ new Date()).setHours(
          Number(e.getElementById("hour").value),
          Number(e.getElementById("minutes").value)
        ));
        e.getElementById("hour").value = ("00" + h.getHours()).substr(-2), e.getElementById("minutes").value = ("00" + h.getMinutes()).substr(-2), e.getElementById("hour").dispatchEvent(new CustomEvent("updateselect")), e.getElementById("minutes").dispatchEvent(new CustomEvent("updateselect"));
      });
    }), e.querySelector("#hour").addEventListener("updateselect", function() {
      var i;
      let s = this.value;
      e.querySelector("#hour-selection").scroll(
        0,
        (i = e.querySelector(`#hour-selection .select-option[data-text-value="${s}"], #hour-selection .select-option[data-value="${s}"]`)) == null ? void 0 : i.offsetTop
      ), e.querySelectorAll("#hour-selection .select-option").forEach(function(l) {
        l.dataset.value == s || l.dataset.textValue == s ? l.classList.add("selected") : l.classList.remove("selected");
      });
    }), e.querySelector("#minutes").addEventListener("updateselect", function() {
      var i;
      let s = this.value;
      e.querySelector("#minute-selection").scroll(
        0,
        (i = e.querySelector(`#minute-selection .select-option[data-text-value="${s}"], #minute-selection .select-option[data-value="${s}"]`)) == null ? void 0 : i.offsetTop
      ), e.querySelectorAll("#minute-selection .select-option").forEach(function(l) {
        l.dataset.value == s || l.dataset.textValue == s ? l.classList.add("selected") : l.classList.remove("selected");
      });
    }), e.querySelector("#time-select-icon").addEventListener("click", function() {
      if (t.disabled || t.readonly)
        return !1;
      let s = e.querySelector("#time-select").dataset.hide;
      e.querySelector("#time-select").dataset.hide = !JSON.parse(s), e.getElementById("hour").dispatchEvent(new CustomEvent("updateselect")), e.getElementById("minutes").dispatchEvent(new CustomEvent("updateselect"));
    }), e.querySelectorAll("#hour-selection .select-option").forEach(function(s) {
      s.addEventListener("click", function() {
        if (t.disabled || t.readonly)
          return !1;
        e.querySelector("#time-select").dataset.hide = !0, e.getElementById("hour").value = this.innerText, e.getElementById("hour").dispatchEvent(new CustomEvent("input"));
      });
    }), e.querySelectorAll("#minute-selection .select-option").forEach(function(s) {
      s.addEventListener("click", function() {
        if (t.disabled || t.readonly)
          return !1;
        e.querySelector("#time-select").dataset.hide = !0, e.getElementById("minutes").value = this.innerText, e.getElementById("minutes").dispatchEvent(new CustomEvent("input"));
      });
    });
  }
  get value() {
    let t = this.shadowRoot;
    return `${t.getElementById("hour").value || "00"}:${t.getElementById("minutes").value || "00"}`;
  }
  set value(t) {
    if (t instanceof Date) {
      let e = `000${t.getHours()}`.substr(-2), o = `000${t.getMinutes()}`.substr(-2);
      t = `${e}:${o}`;
    }
    this.setAttribute("value", t);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "max", "min"];
  }
  get valueAsNumber() {
    let t = this.shadowRoot;
    return (/* @__PURE__ */ new Date(0)).setUTCHours(
      t.getElementById("hour").value || 0,
      t.getElementById("minutes").value || 0
    );
  }
  set valueAsNumber(t) {
    if (typeof t != "number")
      throw "the value of valueAsDate should be number";
    let e = this.shadowRoot, o = new Date(t);
    e.getElementById("hour").value = `000${o.getHours()}`.substr(-2), e.getElementById("minutes").value = `000${o.getMinutes()}`.substr(-2);
  }
  get valueAsDate() {
    return new Date(this.valueAsNumber);
  }
  set valueAsDate(t) {
    if (!(t instanceof Date))
      throw "the value of valueAsDate should be Date object";
    let e = this.shadowRoot;
    e.getElementById("hour").value = `000${t.getHours()}`.substr(-2), e.getElementById("minutes").value = `000${t.getMinutes()}`.substr(-2);
  }
  attributeChangedCallback(t, e, o) {
    switch (super.attributeChangedCallback(t, e, o), t) {
      case "disabled":
      case "readonly":
        o === "" || (o || "").toLowerCase() == t.toLowerCase() ? this.shadowRoot.getElementById("main").classList.add(t) : this.shadowRoot.getElementById("main").classList.remove(t);
        break;
      case "value":
        if (o.match(/\d{2}:\d{2}/g)) {
          let s = o.match(/\d{2}:\d{2}/g)[0].split(":");
          this.shadowRoot.getElementById("hour").value = s[0], this.shadowRoot.getElementById("minutes").value = s[1];
        }
        break;
      case "max":
        o.match(/\d{2}:\d{2}/g) && this.value > o && (this.value = o);
        break;
      case "min":
        o.match(/\d{2}:\d{2}/g);
        break;
    }
  }
}
customElements.define("nu-time-input", g);
