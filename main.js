const div_settings = document.getElementById("settings");
const button_start = document.getElementById("button_start");
const input_background_image = document.getElementById("input_background_image");
const textarea_script = document.getElementById("textarea_script");
const div_player = document.getElementById("player");
const div_background_image_container = document.getElementById("background_image_container");
const img_background_image = document.getElementById("background_image");
const p_text = document.getElementById("text");
const div_player_controller_container = document.getElementById("player_controller_container");
const button_play = document.getElementById("button_play");
const button_stop = document.getElementById("button_stop");
const button_fullscreen = document.getElementById("button_fullscreen");
const button_return = document.getElementById("button_return");
const input_scroll_speed = document.getElementById("scroll_speed");
const span_scroll_speed_value = document.getElementById("scroll_speed_value");
const input_text_size = document.getElementById("text_size");
const span_text_size_value = document.getElementById("text_size_value");
const input_theme_light = document.getElementById("input_theme_light");
const input_theme_dark = document.getElementById("input_theme_dark");
const input_background_image_opacity = document.getElementById("background_image_opacity");
const span_background_image_opacity_value = document.getElementById("opacity_value");

let interval_scroll_id = null;
let scroll_speed = 1;
let scroll_interval = 50;

function main() {
    setSettingsEvents();
    setPlayerEvents();
}

function setSettingsEvents() {
    button_start.addEventListener("click", () => {
        let text = textarea_script.value;
        p_text.innerHTML = text.replace(/\n/g, "<br />");

        div_settings.style.display = "none";
        div_player.style.display = "block";
    });

    input_background_image.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                img_background_image.src = e.target.result;
                img_background_image.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            img_background_image.display = "none";
        }
    });
}

function setPlayerEvents() {
    // コントローラー内のクリックでイベントのバブリングを止める
    div_player_controller_container.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    div_player.addEventListener("click", () => {
        if (div_player_controller_container.style.display === "none") {
            div_player_controller_container.style.display = "block";
        } else {
            div_player_controller_container.style.display = "none";
        }
    });

    button_play.addEventListener("click", () => {
        const speed = parseInt(input_scroll_speed.value, 10);
        scrollText(speed);
        div_player_controller_container.style.display = "none";
    });

    button_stop.addEventListener("click", () => {
        if (interval_scroll_id !== null) {
            clearInterval(interval_scroll_id);
            interval_scroll_id = null;
        }
    });

    button_fullscreen.addEventListener("click", () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
            screen.orientation.lock("landscape-primary");
        }
    });

    button_return.addEventListener("click", () => {
        if (interval_scroll_id !== null) {
            clearInterval(interval_scroll_id);
            interval_scroll_id = null;
        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        div_player.style.display = "none";
        div_settings.style.display = "block";
    });

    input_scroll_speed.addEventListener("input", (event) => {
        const value = parseInt(event.target.value, 10);
        span_scroll_speed_value.textContent = value;

        if (interval_scroll_id !== null) {
            scrollText(value);
        }
    });

    input_text_size.addEventListener("input", (event) => {
        const value = parseInt(event.target.value, 10);
        span_text_size_value.textContent = value;
        p_text.style.fontSize = `${value}px`;
    });

    input_theme_light.addEventListener("change", (event) => {
        if (event.target.checked) {
            p_text.style.color = "black";
            div_background_image_container.style.backgroundColor = "white";
        };
    });
    input_theme_dark.addEventListener("change", (event) => {
        if (event.target.checked) {
            p_text.style.color = "silver";
            div_background_image_container.style.backgroundColor = "black";
        };
    });

    input_background_image_opacity.addEventListener("input", (event) => {
        const value = parseInt(event.target.value, 10);
        img_background_image.style.opacity = value / 100;
        span_background_image_opacity_value.textContent = value;
    });
}

function scrollText(speed) {
    if (interval_scroll_id !== null) {
        clearInterval(interval_scroll_id);
    }

    if (speed < 10) {
        scroll_speed = 1;
        scroll_interval = 50 + (10 - speed) * 10;
    }
    else {
        scroll_speed = speed - 9;
        scroll_interval = 50;
    }

    console.log(`Scroll speed: ${scroll_speed}, Interval: ${scroll_interval}`);

    interval_scroll_id = setInterval(() => {
        window.scrollBy({
            top: scroll_speed,
            left: 0,
            behavior: 'smooth'
        });
    }, scroll_interval);
}


main();