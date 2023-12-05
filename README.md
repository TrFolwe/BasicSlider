# Responsive Image Slider

To review https://trfolwe.github.io/ResponsiveSlider/

![image](https://user-images.githubusercontent.com/78105136/219118934-5e61f7ab-8190-480d-a744-db269ba1c997.png)

# import
```html
<script src="slider.js"></script>
```

# Main code
```html
<div class="slider">
        <ul class="slider-btns"></ul>
        <div class="slider-imgs">
            <div class="slider-element">
                <img class="slider-img" src="..." alt="">
                <div class="description">
                    <h2>Title...</h2>
                    <p>Description...</p>
                </div>
            </div>
        </div>
    </div>
```

# For next/prev buttons
```html
<div class="slider">
        <ul class="slider-btns"></ul>
        <!-- Prev/Next --->
        <div class="slider-actions">
            <div class="prev">
                <img src="./assets/prev-btn.png" alt="">
            </div>
            <div class="next">
                <img src="./assets/next-btn.png" alt="">
            </div>
        </div>
        <!----->
        <div class="slider-imgs">
            <img class="slider-img" src="..." alt="">
        </div>
    </div>
```

# for auto transition
```html
<div autoscroll="intervalDelay(2000)" class="slider">
        <ul class="slider-btns"></ul>
        <div class="slider-imgs">
            <img class="slider-img" src="..." alt="">
        </div>
    </div>
```
I wish you happy codes :)
