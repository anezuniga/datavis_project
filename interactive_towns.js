document.getElementById('leftImage').addEventListener('click', function(event) {
    const img = event.target;
    const rect = img.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const xPercentage = (offsetX / img.width) * 100;
    const yPercentage = (offsetY / img.height) * 100;

    if (xPercentage >= 10 && xPercentage <= 30 && yPercentage >= 30 && yPercentage <= 50) {
        document.getElementById('rightImage').src = 'figures/Bolton.svg';
        document.getElementById('rightText').textContent = 'Bolton is labeled as a municipality with 100% single-family zoning. However, Bolton does not have an environmental justice population.';
    } else if (xPercentage >= 40 && xPercentage <= 50 && yPercentage >= 50 && yPercentage <= 70) {
        document.getElementById('rightImage').src = 'figures/Newton.svg';
        document.getElementById('rightText').textContent = 'Newton is a municipality with 77% single-family zoning. According to analysis and the map, there are significantly more single-family residences in Newton, which is zoned for 77% single-family zoning, compared to Hanover and Bolton, which have 100% single-family zoning.';
    } else if (xPercentage >= 50 && xPercentage <= 60 && yPercentage >= 40 && yPercentage <= 60) {
        document.getElementById('rightImage').src = 'figures/Cambridge.svg';
        document.getElementById('rightText').textContent = 'Cambridge is labeled as a 0% single-family municipality, but it actually has numerous single-family parcels, especially around Harvard, where there are no environmental justice populations. However, Cambridge does have a substantial environmental justice population compared to municipalities with single-family zoning.';
    } else if (xPercentage >= 60 && xPercentage <= 80 && yPercentage >= 70 && yPercentage <= 90) {
        document.getElementById('rightImage').src = 'figures/Hanover.svg';
        document.getElementById('rightText').textContent = 'Hanover is a municipality with 100% single-family zoning. However, Hanover does have a small portion of the environmental justice population.';
    }
});
