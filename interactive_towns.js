document.getElementById('leftImage').addEventListener('click', function(event) {
    const img = event.target;
    const rect = img.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;  // Corrected for element's position on the page
    const offsetY = event.clientY - rect.top;

    // Calculate percentage positions relative to the image size
    const xPercentage = (offsetX / img.width) * 100;
    const yPercentage = (offsetY / img.height) * 100;

    // Define regions based on percentage ranges
    if (xPercentage >= 10 && xPercentage <= 30 && yPercentage >= 30 && yPercentage <= 50) {
        // Region 1
        document.getElementById('rightImage').src = 'figures/Bolton.svg';
    } else if (xPercentage >= 40 && xPercentage <= 50 && yPercentage >= 50 && yPercentage <= 70) {
        // Region 2
        document.getElementById('rightImage').src = 'figures/Newton.svg';
    } else if (xPercentage >= 50 && xPercentage <= 60 && yPercentage >= 40 && yPercentage <= 60) {
        // Region 3
        document.getElementById('rightImage').src = 'figures/Cambridge.svg';
    } else if (xPercentage >= 60 && xPercentage <= 80 && yPercentage >= 70 && yPercentage <= 90) {
        // Region 4
        document.getElementById('rightImage').src = 'figures/Hanover.svg';
    }
});
