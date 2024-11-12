export function lmt(matchId) {
  if (matchId !== null) {
    SIR("addWidget", document.querySelector(".sr-widget"), "match.lmtPlus", {
      showOdds: false,
      layout: "double",
      scoreboard: "compact",
      collapseTo: "momentum",
      momentum: "extended",
      tabsPosition: "top",
      pitchLogo: "https://cdn.urexch.com/landing/img/logo-Loginpage.png",
      goalBannerImage: "https://cdn.urexch.com/landing/img/logo-Loginpage.png",
      goalBannerCustomBgColor: "#FFFFFF",
      logo: ["https://cdn.urexch.com/landing/img/logo-Loginpage.png"],
      matchId: matchId,
    });
  }
}


export function iFrameResizer(id){

  iFrameResize(

    {
      log:false,
      autoResize: true,
      checkOrigin: false
    }, '#'+id);

}
