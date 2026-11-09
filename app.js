(function () {
  const data = window.TABKAT;
  const $ = (id) => document.getElementById(id);

  $("name").textContent = data.name;
  if (data.tagline) $("tagline").textContent = data.tagline;
  else $("tagline").remove();
  $("avatar").textContent = data.name.charAt(0).toUpperCase();
  $("github").href = data.github;
  document.title = data.name + " · Tabkat";

  const host = (url) => new URL(url).host.replace(/^www\./, "") + new URL(url).pathname.replace(/\/$/, "");

  const list = $("sites");
  data.sites.forEach((site, i) => {
    const li = document.createElement("li");
    li.className = "card";
    li.style.setProperty("--i", i);
    li.innerHTML = `
      <a class="card-link" href="${site.url}" target="_blank" rel="noopener">
        <div class="shot"><img src="${site.preview}" alt="" loading="${i < 4 ? "eager" : "lazy"}" width="960" height="600"></div>
        <div class="meta">
          <h2></h2>
          <p class="desc"></p>
          <span class="host"></span>
        </div>
      </a>
      <button class="peek-btn" type="button">Live preview</button>`;
    li.querySelector("h2").textContent = site.name;
    li.querySelector(".desc").textContent = site.description;
    li.querySelector(".host").textContent = host(site.url);
    li.querySelector("img").alt = "Screenshot of " + site.name;
    li.querySelector(".peek-btn").setAttribute("aria-label", "Live preview of " + site.name);
    li.querySelector(".peek-btn").addEventListener("click", () => openPeek(site));
    list.appendChild(li);
  });

  // Live preview: loads the real site in a frame without leaving the page.
  const dlg = $("peek");
  const frame = $("peek-frame");
  function openPeek(site) {
    $("peek-title").textContent = site.name;
    $("peek-open").href = site.url;
    frame.src = site.url;
    dlg.showModal();
  }
  function closePeek() {
    dlg.close();
  }
  dlg.addEventListener("close", () => { frame.src = "about:blank"; });
  $("peek-close").addEventListener("click", closePeek);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) closePeek(); });
})();
