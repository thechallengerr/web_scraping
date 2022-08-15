
const { mongooseToMultipleObjects } = require('../../util/mongoose.js');
const { checkZaloName } = require('../../util/check_zalo_name.js');
const fs = require('fs');
const csvReader = require('csv-parser');
const { response } = require("express");
const busboy = require('connect-busboy');

class CheckZaloName {
    //[GET] /auto-chat-zalo
    index(req, res) {
        res.render("check-zalo-name/check-zalo-name");
    }

    // [POST] /check-zalo-name
    async check(req, res, next) {
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            var fstream = fs.createWriteStream('./data/contacts/contacts.csv');
            file.pipe(fstream);
            fstream.on('close', function () {
                let data;
                // let csv = 'STT,SĐT,Họ Tên,Tên Zalo';
                zaloNameCheck(data)
                    .then((infos) => {
                        let htmls = infos.map(info => {

                            return `
					<div class="row border-bottom mt-2">
					<div class="col-sm-1">
						${info.index}
					</div>
					<div class="col-sm-2 ">
						${info.phone.startsWith('0') ? info.phone : '0' + info.phone}
					</div>
					<div class="col-sm-4">
						${info.name}
					</div>
					<div class="col-sm-5 font-weight-bold ${info.zaloName === 'Not Registered/Checked' ? 'text-danger' : ''}">
						${info.zaloName}
					</div>
				</div>`
                        });
                        let html = htmls.join('');

                        let downloadFile = `<a href="http://localhost:8888/zalo-name-check/zaloName.csv" class="bg-success p-2 border-0 text-white text-decoration-none" download="zaloName.csv"> Download CSV </a>`
                        let header = `	<div class="row border-bottom mt-2 font-weight-bold">
								<div class="col-sm-1">
									No.
								</div>
								<div class="col-sm-2">
									Phone Number
								</div>
								<div class="col-sm-4">
									Name
								</div>
								<div class="col-sm-5">
									Zalo Name
								</div>
							</div>`
                        res.send(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
			integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
							<h3 class= "mt-5 mb-5 text-center text-uppercase font-weight-bold">Result</h3>
							<div class="container mb-5">` + downloadFile + header + html + `</div> ` + backBtn);
                    })
                    .catch(err => console.log(err));
            });
        }).on('error', function (err) { console.log(err) });

    }

    result(req, res, next) {
        Message.find({})
            .sort({ updatedAt: -1, })
            .then(messages => {
                res.render('auto-chat-zalo/chatlogs', {
                    messages: mongooseToMultipleObjects(messages)
                })
            })
    }
}


module.exports = new CheckZaloName();
