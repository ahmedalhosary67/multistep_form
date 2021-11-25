

function generate() {
    var doc = new jsPDF("p", "pt", "a4");
    let x = $('#example thead th')
    x.each(i => {
        if (x[i].children[1] == undefined) {

        } else {
            x[i].children[1].classList.add('hide')
        }
    })


    // console.log('element is ', elem)
    var elem = document.getElementById("example");

    var data = doc.autoTableHtmlToJson(elem);
    doc.autoTable(data.columns, data.rows, {
        margin: {left: 35},
        //   theme: 'grid',
          tableWidth: 'auto',
          fontSize: 15,
        //   overflow: 'linebreak',
        tableLineColor: [189, 195, 199],
        tableLineWidth: 0.75,
        styles: {
            font: "Meta",
            lineColor: [233, 236, 239],
            lineWidth: 0.25
        },
        headerStyles: {
            fillColor: [233, 236, 239],
            textColor: 20,
            fontSize: 15,
            halign: 'center', 
            valign: 'middle',
        },
        bodyStyles: {
            fillColor: [242, 242, 242],
            textColor: 13,
            halign: 'center', 
            valign: 'middle'
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255],
        },
        startY: 100,
        drawRow: function (row, data) {

            // Colspan
            doc.setFontStyle("bold");
            doc.setFontSize(10);
            if ($(row.raw[0]).hasClass("innerHeader")) {
                doc.setTextColor(200, 0, 0);
                doc.setFillColor(110, 214, 84);
                doc.rect(data.settings.margin.left, row.y, data.table.width, 20, "F");
                doc.autoTableText(
                    "",
                    data.settings.margin.left + data.table.width / 2,
                    row.y + row.height / 2, {
                        halign: "center",
                        valign: "middle"
                    }
                );
            }

            if (row.index % 5 === 0) {
                var posY = row.y + row.height * 6 + data.settings.margin.bottom;
                if (posY > doc.internal.pageSize.height) {
                    data.addPage();
                }
            }
        },
        drawCell: function (cell, data) {
            // Rowspan
            // console.log(cell);
            if ($(cell.raw).hasClass("innerHeader")) {
                doc.setTextColor(200, 0, 0);
                doc.autoTableText(
                    cell.text + "",
                    data.settings.margin.left + data.table.width / 2,
                    data.row.y + data.row.height / 2, {
                        halign: "center",
                        valign: "middle"
                    }
                );

                return false;
            }
        }
    });
    doc.save("table.pdf");
    // console.log(data);
    // document.getElementById("output").append(data);
}

$("#export").click(function (e) {

    e.preventDefault();
    generate();

    $('table thead th button').each(x => {
        $('table thead th button')[x].classList.remove('hide')
    })

});