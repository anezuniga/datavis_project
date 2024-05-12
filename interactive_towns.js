document.getElementById('leftImage').addEventListener('click', function(event) {
    const img = event.target;
    const rect = img.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const xPercentage = (offsetX / img.width) * 100;
    const yPercentage = (offsetY / img.height) * 100;

    if (xPercentage >= 10 && xPercentage <= 30 && yPercentage >= 30 && yPercentage <= 50) {
        document.getElementById('rightImage').src = 'figures/Bolton.svg';
        document.getElementById('rightText').textContent = 'Bolton was chosen because it is a 100% single family zoning municipality. However, Bolton has no environmental justice population.';
    } else if (xPercentage >= 40 && xPercentage <= 50 && yPercentage >= 50 && yPercentage <= 70) {
        document.getElementById('rightImage').src = 'figures/Newton.svg';
        document.getElementById('rightText').textContent = 'Newton was chosen because it is a 77% single-family zoning municipality and according to analysis and the map there are a lot more single-family residences in Newton which is zoned for 77% for single-family zoning than Hanover and Bolton that have 100% single-family zoning.';
    } else if (xPercentage >= 50 && xPercentage <= 60 && yPercentage >= 40 && yPercentage <= 60) {
        document.getElementById('rightImage').src = 'figures/Cambridge.svg';
        document.getElementById('rightText').textContent = 'Cambridge was chosen because it is a 0% single family zoning municipality but there are a lot of single family parcels and a lot of them are concentrated around Harvard where there are no environmental justice populations. However, Cambridge does have a lot of environmental justice population compared to municipalities that have single family zoning.';
    } else if (xPercentage >= 60 && xPercentage <= 80 && yPercentage >= 70 && yPercentage <= 90) {
        document.getElementById('rightImage').src = 'figures/Hanover.svg';
        document.getElementById('rightText').textContent = 'Hanover was chosen because it is a 100% single family zoning municipality. However, Hanover has a small portion of the environmental justice population.';
    }
});
