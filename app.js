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
      </a>`;
    li.querySelector("h2").textContent = site.name;
    li.querySelector(".desc").textContent = site.description;
    li.querySelector(".host").textContent = host(site.url);
    li.querySelector("img").alt = "Screenshot of " + site.name;
    list.appendChild(li);
  });
})();
