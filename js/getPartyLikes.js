			//the thing needs --var authtoken-- to work		
			//you start with getEvents

			var partylikes = [];

			function getPartyLikes(authtoken, partyid)
			{
				partylikes = [];
				getAttendees(partyid);
				var rank = unify(partylikes);
				var keys = Object.keys(rank);
				//zip
				var newrank = [];
				for(var n = 0; n < keys.length; n++)
				{
					newrank.push([keys[n], rank[keys[n]]]);
				}
				newrank = newrank.sort(function(a,b) {
					if(a[1] < b[1])
					{
						return 1;
					} else if(a[1] > b[1])
					{
						return -1;
					}
					return 0;
				});
				return newrank;
			}	
			
			function unify(array)
			{
				rank = []
				for(var n = 0; n < array.length; n++)
				{
					if(array[n] in rank)
					{
						rank[array[n]]++;
					}
					else
					{
						rank[array[n]] = 1;
					}
				}
				return rank;
			}
			function getAttendees(partyid)
			{
				$.getJSON("https://graph.facebook.com/"+partyid+"/invited?access_token="+authtoken, function( info ) {
					for(var i = 0; i < info['data'].length; i++)
					{
						getMusicLikes(info['data'][i]['id'],partyid);
					}
				});	
			}
			function getMusicLikes(person,partyid)
			{
				followOnLikes(partyid,"https://graph.facebook.com/"+person+"/music");
			}
			function followOnLikes(partyid, url)
			{
				$.getJSON(url+"?access_token="+authtoken, function( info ) {
					var all = [];
					//console.log(info['data'].length);
					for(var i = 0; i < info['data'].length; i++)
					{
						all.push([info['data'][i]['name'],info['data'][i]['id']]);
					}
					if(info['paging'])
					{
						if(info['paging']['next'])
						{
							followOnLikes(partyid, info['paging']['next']);
						}
					}
					partylikes = partylike.concat(all);
				});	
			}