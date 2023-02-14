const sliderCSS = document.createElement("link");
sliderCSS.rel = "stylesheet";
sliderCSS.href = "./style.css";
document.querySelector("body").appendChild(sliderCSS)

const sliderData = [];
window.addEventListener("resize", () => {
    sliderData.forEach(slider => {
        const { sliderElement, sliderIndex } = slider;
        sliderElement.querySelector(".slider-imgs").style.right = (sliderIndex * sliderElement.querySelector(".slider-imgs .slider-img").scrollWidth) + "px";
    });
})

const scrollInterval = setInterval(() => {
    sliderData.filter(slider => slider.autoScroll).forEach(slider => {
        const { sliderIndex, sliderElement } = slider;
        slider.sliderIndex++;
        const sliderImgs = sliderElement.querySelector(".slider-imgs");
        if (sliderIndex === sliderElement.querySelectorAll(".slider-imgs img.slider-img").length) {
            slider.sliderIndex = 0;
            sliderImgs.style.right = 0;
        }
        else sliderImgs.style.right = (sliderElement.querySelector(".slider-imgs img.slider-img").scrollWidth * sliderIndex) + "px";
        const sliderBtn = sliderElement.querySelector(`.slider-btns li.slider-btn[index="${sliderIndex}"]`);
        Array.from(sliderElement.querySelectorAll(".slider-btns li.slider-btn")).filter(i => i.hasAttribute("selected") && !i.isEqualNode(sliderBtn)).forEach(i => {
            i.removeAttribute("selected");
        });
        sliderBtn.setAttribute("selected", "");
    })
}, 2000);

document.querySelectorAll(".slider").forEach(slider => {
    const sliderImgCount = slider.querySelector(".slider-imgs img.slider-img").length;
    slider.querySelector(".slider-imgs").style.width = `${sliderImgCount * 100}%`;
    sliderData.push({
        "sliderElement": slider,
        "sliderIndex": 0,
        "intervalDelay": Number(slider.getAttribute("autoscroll")),
        "autoScroll": slider.hasAttribute("autoscroll")
    });
    const sliderImages = slider.querySelectorAll(".slider-imgs img.slider-img");
    for (let i = 0; i < sliderImages.length; i++) {
        slider.querySelector(".slider-btns").innerHTML += `<li index="${i}" ${i === 0 ? 'selected' : ''} class="slider-btn"></li>`;
    }
    sliderImages.forEach(sliderImg => {
        sliderImg.addEventListener("click", () => {
            sliderData.find(data => data.sliderElement === slider).sliderIndex++;
            const sliderIndex = sliderData.find(data => data.sliderElement === slider).sliderIndex;
            if (sliderIndex >= sliderImages.length) {
                sliderData.find(data => data.sliderElement === slider).sliderIndex = 0;
                slider.querySelector(".slider-imgs").style.right = 0;
            } else slider.querySelector(".slider-imgs").style.right = (sliderImg.scrollWidth * sliderIndex) + "px";
            const sliderBtn = slider.querySelector(`.slider-btns li.slider-btn[index="${sliderData.find(data => data.sliderElement === slider).sliderIndex}"]`);
            Array.from(slider.querySelectorAll(".slider-btns li.slider-btn")).filter(i => i.hasAttribute("selected") && !i.isEqualNode(sliderBtn)).forEach(i => {
                i.removeAttribute("selected");
            });
            sliderBtn.setAttribute("selected", "");
        })
    });

    slider.querySelectorAll(".slider-btns .slider-btn").forEach(sliderBtn => {
        sliderBtn.addEventListener("click", () => {
            const sliderIndex = Number(sliderBtn.getAttribute("index"))
            Array.from(slider.querySelectorAll(".slider-btns li.slider-btn")).filter(i => i.hasAttribute("selected") && !i.isEqualNode(sliderBtn)).forEach(i => {
                i.removeAttribute("selected");
            });
            sliderBtn.setAttribute("selected", "");
            sliderData.find(data => data.sliderElement === slider).sliderIndex = sliderIndex;
            const sliderImgSWidth = slider.querySelector(".slider-imgs .slider-img").scrollWidth;
            slider.querySelector(".slider-imgs").style.right = (sliderIndex * sliderImgSWidth) + "px";
        });
    });
});