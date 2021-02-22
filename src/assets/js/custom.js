
var CandidateAckCode = '';
        var CandidateJobCode = '';
        var CodeValue = '';
        var CanID = '';
        var CanCode = '';
        var JobID = '';
		var CandidateID='';

        $(document).ajaxStart(function () {
            // Show loader container
            showLoader();
        });
        $(document).ajaxComplete(function () {
            // Hide loader container
            hideLoader();
        });

        $(document).ready(function () {
            const queryString = window.location.search;

            const urlParams = new URLSearchParams(queryString);

            var jobCode = urlParams.get('code');

            CandidateID = urlParams.get('cref');

            //var optoutStatus = urlParams.get('optout');

            if (CandidateID != null) {
                CodeValue = "4";
                invokeAPI(CodeValue, "", CandidateID, "", "", "Y");
                swal("Thanks for opting out!!!", "", "success").then(function () {
                    // alert();
                    window.close();
                }
                );
                return false;
            }

            else if (jobCode == null || jobCode.length != 6) {
                swal("Invalid URL", "", "warning");
                return false;
            }
            CodeValue = "3";
            CandidateAckCode = jobCode.toUpperCase();
            CandidateJobCode = jobCode.toUpperCase();

            invokeAPI(CodeValue, CandidateAckCode, CanID, CanCode, JobID);
        });

        function invokeAPI(CodeValue, CandidateAckCode, CanID, CanCode, JobID, optout, feedback) {
            debugger;
            $.ajax({
                url: "https://rb-process.azurewebsites.net/api/CandidateFunction?code=q8fIQjUhT7sjSmokExrm9D80BM/gTkT5bHNrhO3oSAV3WpsMsI4llw==",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    CodeValue: CodeValue,
                    CandidateAckCode: CandidateAckCode,
                    CanID: CanID,
                    CanCode: CanCode,
                    JobID: JobID,
                    is_opt_out: optout,
					CanFeedback: feedback
                }),
                success: function () {
                    console.log("Success");
                },
                error: function () {
                    console.log("error");
                },
            }).done(function (result) {
                if (result.FullJD) {
                    var str1 = "Welcome ";
                    var str3 = "!";
                    var res = str1.concat(result.CanUserName, str3);
                    $("#getName").html(res);
                    localStorage.setItem("result", JSON.stringify(result));
                    localStorage.setItem("jobs", JSON.stringify(result.FullJD));
                    refreshDiv();
                } else if (result.Apply) {
                    swal("Thanks for applying! We will get back to you soon.", "", "success");
                } else if (result.Decline) {
					swal("Thank you!!!");
                } else if (result.error) {
                    swal("Invalid Code", "", "error");
                } else {
                    if (result.ExpError != undefined)
                        swal(result.ExpError, "", "error");
                }
            });
        }


        $("#modalClose").click(function () {
            refreshModal();
        });

        function onListApply(val) {
            Info = val.split('_');
            CanID = Info[0];
            CanCode = Info[1];
            JobID = Info[2];
            CodeValue = "1";
            CandidateAckCode = ''
            var jobsArr = JSON.parse(localStorage.getItem('jobs'));

            $.each(jobsArr, function (key, JDValue) {
                if (JDValue.Job_ID == JobID) {
                    //set apply property to true
                    JDValue.Candidate_Applied = "Yes";
                }
            });

            localStorage.setItem("jobs", JSON.stringify(jobsArr));

            invokeAPI(CodeValue, CandidateAckCode, CanID, CanCode, JobID);

            refreshDiv();

            return false;
        }

        function onListDecline(val) {
            Info = val.split('_');
            CanID = Info[0];
            CanCode = Info[1];
            JobID = Info[2];
            CodeValue = "2";
            CandidateAckCode = ''
            var jobsArr = JSON.parse(localStorage.getItem('jobs'));

            $.each(jobsArr, function (key, JDValue) {
                if (JDValue.Job_ID == JobID) {
                    //set decline property to true
                    JDValue.Candidate_Declined = "Yes";
                }
            });
			debugger;

            localStorage.setItem("jobs", JSON.stringify(jobsArr));
            Swal.fire({
                        title: 'Feedback!!!',
                        input: 'textarea',
                        inputPlaceholder: 'Type any other jobs that you are interested in...',
                    }).then(function (result) {
						debugger;
						var feedback= (result.value == undefined) ? "" : result.value;
						CodeValue=2;
						invokeAPI(CodeValue, "No", CanID, CanCode, JobID, "", feedback);
                    });
            refreshDiv();
            return false;
        }

        function onModalApply(val) {
            $('#myModal').modal('toggle');
            Info = val.split('_');
            CanID = Info[0];
            CanCode = Info[1];
            JobID = Info[2];
            CodeValue = "1";
            CandidateAckCode = '';
            var jobsArr = JSON.parse(localStorage.getItem('jobs'));
            $.each(jobsArr, function (key, JDValue) {
                if (JDValue.Job_ID == JobID) {
                    //set apply property to true
                    JDValue.Candidate_Applied = "Yes";
                }
            });

            localStorage.setItem("jobs", JSON.stringify(jobsArr));
            invokeAPI(CodeValue, CandidateAckCode, CanID, CanCode, JobID);
            refreshDiv();
            refreshModal();
            return false;
        }

        function onModalDecline(val) {
            $('#myModal').modal('toggle');
            Info = val.split('_');
            CanID = Info[0];
            CanCode = Info[1];
            JobID = Info[2];
            CodeValue = "2";
            CandidateAckCode = '';
            var jobsArr = JSON.parse(localStorage.getItem('jobs'));
            $.each(jobsArr, function (key, JDValue) {
                if (JDValue.Job_ID == JobID) {
                    //set decline property to true
                    JDValue.Candidate_Declined = "Yes";
                }
            });

            localStorage.setItem("jobs", JSON.stringify(jobsArr));
			
			Swal.fire({
                        title: 'Feedback!!!',
                        input: 'textarea',
                        inputPlaceholder: 'Type any other jobs that you are interested in...',
                    }).then(function (result) {
						debugger;
						var feedback= (result.value == undefined) ? "" : result.value;
						CodeValue=2;
						invokeAPI(CodeValue, "No", CanID, CanCode, JobID, "", feedback);
                        Swal.fire("Thank you!!!")
                    });
            refreshDiv();
            refreshModal();
            return false;
        }

        function openJob(data) {
            var jobsArr = JSON.parse(localStorage.getItem('jobs'));
            for (var i = 0; i < jobsArr.length; i++) {
                if (i === data) {
				
					var location= '';
					if(jobsArr[i].Location==null|| jobsArr[i].Location==''||jobsArr[i].Location==undefined)
					{
						location= 'US';
					}
					else
					{
						location= jobsArr[i].Location;
					}
				
                    var jobTitle = document.getElementById("jobTitle");
                    jobTitle.innerHTML = jobsArr[i].Title;
                    var jobDesc = document.getElementById("jobDesc");
                    jobDesc.innerHTML = jobsArr[i].Description;
                    var jobLoc = document.getElementById("jobLoc");
                    jobLoc.innerHTML = location;
                    ApplydataID = $('#Applybtn' + i).val();
                    $('#PopUpApply').val(ApplydataID);
                    $('#PopUpDecline').val(ApplydataID);

                    if (jobsArr[i].Candidate_Applied == "Yes") {
                        $('#PopUpApply').css({ "cursor": "not-allowed", "background-color": "gray" });
                        $('#PopUpApply').prop('disabled', true);
                        $('#PopUpApply').html('Applied');

                        $('#PopUpDecline').css({ 'display': 'none' });
                    }

                    else if (jobsArr[i].Candidate_Declined == "Yes") {
                        $('#PopUpDecline').css({ "cursor": "not-allowed", "background-color": "gray", "color": "white", "border": "none" });
                        $('#PopUpDecline').prop('disabled', true);
                        $('#PopUpDecline').html('Declined');

                        $('#PopUpApply').css({ 'display': 'none' });
                    }
                    break;
                }
            }
        }

        function refreshDiv() {
            var CompleteHTMList = "";
            var resultArr = JSON.parse(localStorage.getItem('result'));
            var jobsArr = JSON.parse(localStorage.getItem('jobs'));
            $.each(jobsArr, function (key, JDValue) {
                var formattedText = JDValue.Description.replace(/(<([^>]+)>)/ig, '').replace(/(\r\n|\n|\r)/gm, "").replace(/ +(?= )/g, '');
				var location= '';
				if(JDValue.Location==null|| JDValue.Location==''||JDValue.Location==undefined)
				{
					location= 'US';
				}
				else
				{
					location= JDValue.Location;
				}
                var applyBtn = '<button id = "Applybtn' + key + '" style="border-radius: 10px; width: 150px;max-width: 100%; background: #121F65; font-weight: bolder; color: white; border: none; padding: 10px;cursor: pointer;" value="' + resultArr.CandidateID + '_' + CandidateJobCode + '_' + JDValue.Job_ID + '" onclick="onListApply(this.value);">Apply</button>';

                var appliedBtn = '<button id = "Applybtn' + key + '" style="border-radius: 10px; width: 150px;max-width: 100%; background: gray; font-weight: bolder; color: white; border: none; padding: 10px;cursor: not-allowed;" disabled>Applied</button>';

                var declineBtn = '<button id="declinebtn" value="' + resultArr.CandidateID + '_' + CandidateJobCode + '_' + JDValue.Job_ID + '" onclick="onListDecline(this.value);" style="cursor: pointer;">Decline</button>';

                var declinedBtn = '<button id="declinebtn" style="cursor: not-allowed;background: gray; color:white;border: none;" disabled>Declined</button>'

                if (JDValue.Candidate_Applied == "Yes") {
                    var addlist = '<li style="background: white; border-radius: 10px; width: 100%; margin-top: 20px; padding: 20px;"><div class="row"><div class="col-lg-3 col-md-3 col-sm-4 col-xs-4"><div style="font-weight: bolder; color: #121f65;font-size: larger;">Job Title</div><div style="white-space: pre-line; white-space: pre-wrap;">' + JDValue.Title + '</div><div id="joblocationdiv" style="font-weight: bolder; color: #121f65;font-size: larger;"><br />Job Location</div><div>' + location + '</div></div><div class="col-lg-9 col-md-9 col-sm-8 col-xs-8"><div style="font-weight: bolder; color: #121f65;font-size: larger;">Job Description</div><div class="text"><p style=" line-height:1.4em;height:4.0em;overflow:hidden;"> ' + formattedText + '</p></div><a style="cursor: pointer; color: #23527c;" data-toggle="modal" data-target="#myModal" onclick="openJob(' + key + ')">...Read More</a><div style="margin-top: 10px;">' + appliedBtn + ' </div></div></div></li>'
                }

                else if (JDValue.Candidate_Declined == "Yes") {
                    var addlist = '<li style="background: white; border-radius: 10px; width: 100%; margin-top: 20px; padding: 20px;"><div class="row"><div class="col-lg-3 col-md-3 col-sm-4 col-xs-4"><div style="font-weight: bolder; color: #121f65;font-size: larger;">Job Title</div><div style="white-space: pre-line; white-space: pre-wrap;">' + JDValue.Title + '</div><div id="joblocationdiv" style="font-weight: bolder; color: #121f65;font-size: larger;"><br />Job Location</div><div>' + location + '</div></div><div class="col-lg-9 col-md-9 col-sm-8 col-xs-8"><div style="font-weight: bolder; color: #121f65;font-size: larger;">Job Description</div><div class="text"><p style=" line-height:1.4em;height:4.0em;overflow:hidden;"> ' + formattedText + '</p></div><a style="cursor: pointer; color: #23527c;" data-toggle="modal" data-target="#myModal" onclick="openJob(' + key + ')">...Read More</a><div style="margin-top: 10px;">' + declinedBtn + '</div></div></div></li>'
                }

                else {
                    var addlist = '<li style="background: white; border-radius: 10px; width: 100%; margin-top: 20px; padding: 20px;"><div class="row"><div class="col-lg-3 col-md-3 col-sm-4 col-xs-4"><div style="font-weight: bolder; color: #121f65;font-size: larger;">Job Title</div><div style="white-space: pre-line; white-space: pre-wrap;">' + JDValue.Title + '</div><div id="joblocationdiv" style="font-weight: bolder; color: #121f65;font-size: larger;"><br />Job Location</div><div>' + location + '</div></div><div class="col-lg-9 col-md-9 col-sm-8 col-xs-8"><div style="font-weight: bolder; color: #121f65;font-size: larger;">Job Description</div><div class="text"><p style=" line-height:1.4em;height:4.0em;overflow:hidden;"> ' + formattedText + '</p></div><a style="cursor: pointer; color: #23527c;" data-toggle="modal" data-target="#myModal" onclick="openJob(' + key + ')">...Read More</a><div style="margin-top: 10px;">' + applyBtn + ' ' + declineBtn + '</div></div></div></li>'
                }

                CompleteHTMList = CompleteHTMList + "" + addlist;
            });

            $("#showdata").empty().html(CompleteHTMList);
        }

        function refreshModal() {
            $('#PopUpApply').css({ "border-radius": "10px", "width": "150px", "background": "#121F65", "font-weight": "bolder", "color": "white", "border": "none", "padding": "10px", "cursor": "pointer", "display": "block" });
            $('#PopUpApply').prop('disabled', false);
            $('#PopUpApply').html('Apply');
            $('#PopUpDecline').css({ "border-radius": "10px", "width": "150px", "background": "white", "border": "1px solid #121F65", "font-weight": "bolder", "color": "#121F65", "padding": "10px", "margin-left": "10px", "cursor": "pointer", "display": "block" });
            $('#PopUpDecline').prop('disabled', false);
            $('#PopUpDecline').html('Decline');
        }

        function showLoader() {
            $("#loadingContainer").css("display", "block");
            //$(".jobListContainer").css("display", "none");
            //$(".headerContainer").css("display", "none");
        }

        function hideLoader() {
            $("#loadingContainer").css("display", "none");
            //$(".jobListContainer").css("display", "block");
            //$(".headerContainer").css("display", "block");
        }

        //JDValue[2].replace( /(<([^>]+)>)/ig, '').replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,'')