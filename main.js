const fileInput=document.querySelector("#imageFileInput");
const canvas=document.querySelector("#canvas");
const canvasCtx=canvas.getContext("2d");
const brightnessInput=document.querySelector("#brightness");
const saturationInput=document.querySelector("#saturation");

const settings={};
let image = null;

function resetSettings(){
    settings.brightness = "100";
    settings.saturation = "100";

    brightnessInput.value=settings.brightness;
    saturationInput.value=settings.saturation;
}

function updateSettings(key, value){
    if(!image) return;


    settings[key]=value;
    renderImage();
}

function generateFilter(){
    const {brightness,saturation} = settings;

    return `brightness(${brightness}%) saturate(${saturation}%)`;
}

function renderImage(){
    canvas.width=image.width;
    canvas.height=image.height;

    canvasCtx.filter= generateFilter();
    canvasCtx.drawImage(image, 0, 0);
}

brightnessInput.addEventListener("change" ,()=>updateSettings("brightness",brightnessInput.value));
saturationInput.addEventListener("change" ,()=>updateSettings("saturation",saturationInput.value));

fileInput.addEventListener("change", () => {
    image = new Image();

    image.addEventListener("load", () => {
        resetSettings();
        renderImage();
    });
    
    image.src=URL.createObjectURL(fileInput.files[0]);
});

resetSettings();