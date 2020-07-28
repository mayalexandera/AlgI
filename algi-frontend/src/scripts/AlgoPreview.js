class AlgoPreview {
    constructor() {
        this.previewWrapper = document.getElementById('algorithm-preview-wrapper');
        this.loadPreviewBoxes();
    }

    loadPreviewBoxes() {
        for (let i = 0; i < 5; i++) {
            const preivewBox = document.createElement('div');
            preivewBox.classList.add('algorithm-box');
            this.previewWrapper.appendChild(preivewBox);
        }
    }
}
export default AlgoPreview;