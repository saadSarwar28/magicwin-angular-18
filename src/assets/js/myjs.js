document.addEventListener("DOMContentLoaded", function () {
  // Equivalent to iFrameResize (assumed to be an external library, so no change here)
  iFrameResize(
    {
      log: false,
      autoResize: true,
      checkOrigin: false,
    },
    "#stats"
  );

  // Date picker logic (custom implementation)
  const dobPicker = document.querySelector(".dobpicker");

  // Assuming a third-party library is used for date picking
  // For example, using a native input type date with a max date (18 years ago)
  const today = new Date();
  const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18))
    .toISOString()
    .split("T")[0];

  if (dobPicker) {
    dobPicker.setAttribute("max", eighteenYearsAgo); // Disable future dates (you can use your preferred date picker here)
  }
});
