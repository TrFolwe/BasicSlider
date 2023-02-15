const sliderCSS = document.createElement("link");
sliderCSS.rel = "stylesheet";
sliderCSS.href = "./style.css";
document.querySelector("body").appendChild(sliderCSS)

const sliderData = [];

const sliderRender = (interval = false) => {
    sliderData.forEach(slider => {
        const { sliderElement, sliderIndex } = slider;
        if (slider.autoScroll && interval) {
            if (sliderIndex === sliderElement.querySelectorAll(".slider-imgs img.slider-img").length - 1) slider.sliderIndex = 0;
            else slider.sliderIndex++;
        }
        sliderElement.querySelector(".slider-btns .slider-btn[selected]").removeAttribute("selected");
        sliderElement.querySelector(`.slider-btns .slider-btn[index='${sliderIndex}']`).setAttribute("selected", "");
        sliderElement.querySelector(".slider-imgs").style.right = sliderElement.querySelectorAll(".slider-imgs .slider-img").length === sliderIndex ? 0 : ((sliderElement.querySelector(".slider-imgs .slider-img").scrollWidth * sliderIndex) + "px");
    })
}

setInterval(() => sliderRender(true), 2000);
window.addEventListener("resize", () => sliderRender());

document.querySelectorAll(".slider").forEach(slider => {
    const sliderImages = slider.querySelectorAll(".slider-imgs img.slider-img");
    slider.querySelectorAll(".slider-imgs .slider-element").forEach(sliderE => sliderE.style.width = `${100 / sliderImages.length}%`)
    slider.querySelector(".slider-imgs").style.width = `${sliderImages.length * 100}%`;
    sliderData.push({
        "sliderElement": slider,
        "sliderIndex": 0,
        "intervalDelay": Number(slider.getAttribute("autoscroll")),
        "autoScroll": slider.hasAttribute("autoscroll")
    });
    for (let i = 0; i < sliderImages.length; i++)
        slider.querySelector(".slider-btns").innerHTML += `<li index="${i}" ${i === 0 ? 'selected' : ''} class="slider-btn"></li>`;

    slider.querySelectorAll(".slider-actions > *").forEach(sliderActions => {
        sliderActions.addEventListener("click", () => {
            const { className } = sliderActions;
            const activeSliderData = sliderData.find(data => data.sliderElement === slider);
            if (className === 'prev') {
                if (activeSliderData.sliderIndex === 0) activeSliderData.sliderIndex = slider.querySelectorAll(".slider-imgs .slider-img").length - 1;
                else activeSliderData.sliderIndex--;
            } else if (className === 'next') {
                if (activeSliderData.sliderIndex === slider.querySelectorAll(".slider-imgs .slider-img").length - 1) activeSliderData.sliderIndex = 0;
                else activeSliderData.sliderIndex++;
            }
            sliderRender();
        })
    })

    slider.querySelectorAll(".slider-btns .slider-btn").forEach(sliderBtn => {
        sliderBtn.addEventListener("click", () => {
            sliderData.find(data => data.sliderElement === slider).sliderIndex = parseInt(sliderBtn.getAttribute("index"));
            sliderRender();
        });
    });
});