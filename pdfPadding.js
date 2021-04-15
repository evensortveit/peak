function toDataUrl(url) {
    //https://github.com/Rob--W/cors-anywhere
    url = 'https://proxy-app-server.herokuapp.com/' + url;
    return new Promise((resolve)=>{
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            let reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    })
}
    /**
     * https://peak-group.webflow.io/fleets/mv-bulk-viking
     * https://peak-group.webflow.io/fleets/mv-peak-breskens
     * https://peak-group.webflow.io/fleets/mv-nor-viking-new-2021
     */
    let fileName = 'download'
    function print(){
    //initialize the pdf
    let pageWidth = 595;
    let pageHeight = 842;
    let doc = new jsPDF('p', 'pt', [pageWidth, pageHeight]);
    let margin = {left: 24, right:24, top:14, bottom:30};
    let width = pageWidth - margin.left - margin.right;
    let height = pageHeight - margin.top - margin.bottom;
    let images = $('#w-slider-mask-2 > div > .fleetimage');

    let imagePromise = []
    images.each((_, img)=>{
        imagePromise.push(toDataUrl(img.src));
    })
    Promise.all(imagePromise).then((images)=>{
        addPageOne(images[0], images.length);
        if(images.length > 1){
            addImagePages(images.slice(1))
        }
    });
    function addPageOne(image, totalPages){
        const logo = "data:image/png;base64,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"
        doc.setPage(1);
        doc.setDrawColor(181, 13, 18);
        doc.setFillColor(181, 13, 18)
        doc.rect(margin.left, margin.top, 74, 38, 'F');
        doc.addImage(logo,'PNG',margin.left + 15, margin.top + 10, 39, 18);
        doc.setTextColor(181, 13, 18);
        doc.setFontType('bold');
        doc.setFontSize(8);
        doc.text('Peak Group As', margin.left + 82, margin.top + 10);
        doc.setFontType('normal');
        doc.text('Particulars', margin.left + 82, margin.top + 20);
        doc.setTextColor(0, 0, 0);
        doc.setLineCap(2);
        doc.line(margin.left, margin.top + 40, margin.left +  width, margin.top + 40);
        doc.setDrawColor(0, 0, 0);
        doc.setFontSize(7);
        let leftTop = $('.w-layout-grid.grid-2>.fleetinfodiv').toArray().map(d=>$(d).text()).filter(d=>d !== ':');
        let keys = leftTop.filter((_,i)=>i%2===0);
        let values = leftTop.filter((_,i)=>i%2===1);
        const shipName = $('.splitdiv.left>h1').text();
        fileName = shipName;
        doc.setFontSize(12);
        doc.text(shipName, margin.left, margin.top + 60)
        doc.setFontType('normal')
        let leftY = drawSection('Project Cargo', ['Ship Name', ...keys], [shipName, ...values], margin.left, margin.top + 80);
        let leftMiddle = $('.w-dyn-item > .w-layout-grid.grid-2').not('.w-condition-invisible').not('.com').find('.columncontainer').not('.w-condition-invisible').find('.fleetinfo').toArray().map(d=>$(d).text()).filter(d=>d !== ':');
        keys = leftMiddle.filter((_,i)=>i%2===0);
        values = leftMiddle.filter((_,i)=>i%2===1);
        let rightY  = margin.top + 80;
        let vesselsY = leftY + 20;
        vesselsY =  Math.max(vesselsY, rightY + width/3.5 + 20);
        leftY = drawSection('VESSEL\'S CHARACTERISTICS', keys, values, margin.left, vesselsY);
        leftMiddle = $('.w-dyn-item > .w-layout-grid.grid-2.com').not('.operator').find('.columncontainer').not('.w-condition-invisible').find('.fleetinfo').toArray().map(d=>$(d).text()).filter(d=>d !== ':');
        keys = leftMiddle.filter((_,i)=>i%2===0);
        values = leftMiddle.filter((_,i)=>i%2===1);
        const communicationY = leftY + 20;
        leftY = drawSection('COMMUNICATION FACILITIES', keys, values, margin.left, communicationY);

        let rightX = margin.left  + width/2;
        if(image){
            doc.addImage(image, 'JPEG', rightX, rightY, width/2, width/3.5);
            rightY = vesselsY
        }
        let rightMiddle =  $('.w-dyn-item > .columncontainer').not('.w-condition-invisible').find('.fleetinfo').toArray().map(d=>$(d).text()).filter(d=>d !== ':');
        keys = rightMiddle.filter((_,i)=>i%2===1);
        values = rightMiddle.filter((_,i)=>i%2===0);
        drawSection('HOLD CHARACTERISTICS', keys, values, rightX, rightY);
        let rightBottom = $('.w-dyn-item > .w-layout-grid.grid-2.operator').find('.columncontainer').not('.w-condition-invisible').find('.fleetinfo').toArray().map(d=>$(d).text()).filter(d=>d !== ':');
        keys = rightBottom.filter((_,i)=>i%2===0);
        values = rightBottom.filter((_,i)=>i%2===1);
        drawSection('OPERATORS / OWNERS', keys, values, rightX, communicationY);
        footer(1, totalPages, width, height);
    }

    function drawSection(title, keys, values, startX, startY){
        doc.setFontSize(7)
        doc.setFontType('bold');
        doc.text(title, startX, startY);
        doc.setFontType('normal');
        startY += 18;
        const colonX = startX + width/4 - 15;
        const valueX = startX + width/4;
        for (let i = 0; i < values.length; i++){
            const colonY = startY;
            let keysY = startY;
            doc.splitTextToSize(keys[i], width/4 - 30).forEach((value)=>{
                doc.text(value, startX, keysY);
                keysY += 10;
            });
            doc.text(':', colonX, colonY);
            let valuesY = startY;
            doc.splitTextToSize(values[i], width/4 - 10).forEach((value)=>{
                doc.text(value, valueX, valuesY);
                valuesY += 10;
            });
            startY = Math.max(keysY, valuesY);
        }
        return startY;
    }

    function addImagePages(images){
        images = images.filter(d=>!d.includes('application/xml'))
        images.forEach((image, index)=>{
            doc.addPage(height + margin.left + margin.right, width + margin.top + margin.bottom);
            doc.rect(margin.left +  140, margin.top + 40, height -  280, width-80);
            doc.addImage(image, 'JPEG', margin.left +  145, margin.top + 45, height -  290, width-90);
            footer(index+2, images.length+1, height, width);
        });
       doc.save(fileName + '.pdf')
    }

    //Footer
    function footer(pageNumber, totalPages, width, height, imageData) {
        doc.setPage(pageNumber);
        let pn = "Page " + pageNumber + "/" + totalPages
        let str1 = "All details are given in good faith, believed to be correct but without guarantee";
        let str2 = "Peak Group AS,Litlåsveien 49, 5132 Nyborg, Norway";
        doc.setFontSize(6);
        doc.setDrawColor(181, 13, 18);
        doc.setLineCap(2);
        doc.line(margin.left, margin.top + height, margin.left +  width, margin.top + height); // horizontal line
        doc.text(pn, margin.left + width - doc.getTextWidth(pn),margin.top + height + 8);
        doc.text(str1, margin.left + width/2 - doc.getTextWidth(str1)/2, margin.top + height + 10);
        doc.text(str2, margin.left + width/2 - doc.getTextWidth(str2)/2, margin.top + height + 17);
    }


}

