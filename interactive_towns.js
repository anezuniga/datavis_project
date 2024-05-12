document.getElementById('leftImage').addEventListener('click', function(event) {
    const { offsetX, offsetY } = event;

    // Define conditions based on the click positions or other attributes
    if (offsetX < 100 && offsetY < 100) {
        document.getElementById('rightImage').src = 'figures/Cambridge.svg';
    } else {
        document.getElementById('rightImage').src = 'figures/Bolton.svg';
    }
});
