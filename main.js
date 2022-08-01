const express = require('express');
const axios = require('axios');
const { Builder, By, Key, until, JavascriptExecutor, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { fbFriendsCrawler, } = require('./scripts/facebook_friends.js');
const { getAllZaloGroups } = require('./scripts/zalo_groups.js');
const { getSpecificGroupMembers } = require('./scripts/getGroupMembers.js');
const csvReader = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const { json } = require('express');
const app = express();
const port = 8888;

//middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Route 
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'src/index.html'));
});


app.post('/fb-friends', (req, res) => {
	let data = new Array();
	fbFriendsCrawler(req.body.email, req.body.password, "friend", data).then(friends => {
		let htmls = friends.map(friend => {
			return `
			<div class="friend-list">
				
				<div class="row border-bottom mt-2">
					<div class="col-sm-2">
						${friend.index}
					</div>
					<div class="col-sm-4 font-weight-bold">
						${friend.name}
					</div>
					<div class="col-sm-6">
						<a href="${friend.link}">${friend.link}</a>
					</div>
				</div>
				
			</div>`
		});
		let html = htmls.join('');
		let header = `	<div class="row border-bottom mt-2">
							<div class="col-sm-2 font-weight-bold">
								No.
							</div>
							<div class="col-sm-4 font-weight-bold">
								Name
							</div>
							<div class="col-sm-6 font-weight-bold">
								FB Link
							</div>
						</div>`
		res.send(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
					<h3 class= "mt-5 mb-5 text-center text-uppercase font-weight-bold">Result</h3>
					<div class="container mb-5">`+ header + html + `</div>`);
	}).catch((err) => {
		console.error(err);
		res.sendFile(path.join(__dirname, 'src/404.html'));
	}
	);
	// res.send(req.body);
});

app.get('/fb-friends', (req, res) => {
	res.sendFile(path.join(__dirname, 'src/crawl-friends-fb.html'));
})


app.get('/zalo-specific-group', (req, res) => {
	res.sendFile(path.join(__dirname, 'src/crawl-gr-members-zalo.html'));
	// res.send('Specific Group members');
});

app.post('/zalo-specific-group', (req, res) => {
	let data;
	console.log(req.body);
	getSpecificGroupMembers(req.body.group, data)
		.then((data) => {
			let htmls = data.members.map(member => {
				return `
				<div class="row border-bottom mt-2">
					<div class="col-sm-2">
						${data.members.indexOf(member)}
					</div>
					<div class="col-sm-10 text-primary">
						${member}
					</div>
				
				</div>`
			});
			let html = htmls.join('');
			let header = `<h3 class="mt-5 mb-5">Group: ${data.gr_name} </h3>`
			res.send(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
		integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
						<h3 class= "mt-5 mb-5 text-center text-uppercase font-weight-bold">Result</h3>
						<div class="container mb-5">`+ header + `<ul class="p-4">${html}</ul>` + `</div>`);
		})
		.catch((err) => {
			console.log(err);
			res.sendFile(path.join(__dirname, 'src/404.html'));
		});
});



app.get('/zalo-groups', (req, res) => {
	res.sendFile(path.join(__dirName, 'src/crawl-groups-zalo.html'));

});

app.post('/zalo-groups', (req, res) => {
	let data;
	getAllZaloGroups(data)
		.then(groups => {
			console.log(groups);
			// res.json(groups);
			let htmls = groups.map(group => {
				return `
			<div class="friend-list">
				
				<div class="row border-bottom mt-2">
					<div class="col-sm-2">
						${group.index}
					</div>
					<div class="col-sm-4 font-weight-bold">
						${group.gr_name}
					</div>
					<div class="col-sm-6">
						${group.participants}
					</div>
				</div>
				
			</div>`
			});
			let html = htmls.join('');
			let header = `	<div class="row border-bottom mt-2">
							<div class="col-sm-2 font-weight-bold">
								No.
							</div>
							<div class="col-sm-4 font-weight-bold">
								Group Name
							</div>
							<div class="col-sm-6 font-weight-bold">
								Number of participants
							</div>
						</div>`
			res.send(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
		integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
						<h3 class= "mt-5 mb-5 text-center text-uppercase font-weight-bold">Result</h3>
						<div class="container mb-5">`+ header + html + `</div>`)
		})
		.catch((err) => {
			console.log(err);
			res.sendFile(path.join(__dirname, 'src/404.html'));
		});
})

app.listen(port, () => {
	console.log(`Crawler app listening on port ${port}`)
});