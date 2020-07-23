layout: post
title: Reponsive emails that works in outlook
description: Reponsive emails that works in outlook
date: 2014-08-22
author: Jonas Colmsjo
tags: ['post','HTML','respopnsive','email']


Introduction
============

Composing emails that looks good in most browsers is a real challenge. Responsive web design is pretty standard by
now but this is not the case for emails. Outlook is espacially challenging. It seams that outlook is using the
same engine as Word to render HTML and therefore has severe limitations. Also PNG’s will not render consistently in Outlook
so use GIF:s and JPG:s instead. And don't use PGP or S/MIME signatures, these makes Outlook render the whole mail wrong



Some good links:

 * Responsvie emails and [Outlook](http://www.outsidethebracket.com/responsive-email-templates-outlook/)
 * [Some guidelines](http://www.outsidethebracket.com/creating-email-templates/)
 * [Mailchimp introduction](http://templates.mailchimp.com/development/responsive-email/)
 * [Put CSS into mail](http://templates.mailchimp.com/resources/inline-css/) (since some clients strip out headers)
 * Market share for [email clients](http://emailclientmarketshare.com/)
 * Test [how emails look in different clients](http://litmus.com/email-testing)
 * Interesting article about [inline images](https://www.campaignmonitor.com/blog/post/3927/embedded-images-in-html-email) (don't work in many clients though)


Some responsive email templates:

 * [Zurb Ink](http://zurb.com/ink/)
 * [Responsive email patterns](http://responsiveemailpatterns.com/)


NOTE: In OSX are HTML mails sent by opening the page in Safari and then choosing `File->Share->Email`





Template
========

This is a template that I developed. The main inspiration comes from this [article](http://www.outsidethebracket.com/responsive-email-templates-outlook/):

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
	    <title>En liten hälsning från Jonas Colmsjö</title>

	    <style type="text/css">

	        /* Resets: see reset.css for details */
	        .ReadMsgBody { width: 100%; background-color: #ebebeb;}
	        .ExternalClass {width: 100%; background-color: #ebebeb;}
	        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height:100%;}
	        body {-webkit-text-size-adjust:none; -ms-text-size-adjust:none;}
	        body {margin:0; padding:0;}
	        table {border-spacing:0;}
	        table td {border-collapse:collapse;}
	        .yshortcuts a {border-bottom: none !important;}

	        /* Constrain email width for small screens */
	        @media screen and (max-width: 600px) {
	            table[class="container"] {
	                width: 95% !important;
	            }
	        }

	        /* Give content more room on mobile */
	        @media screen and (max-width: 480px) {
	            td[class="container-padding"] {
	                padding-left: 12px !important;
	                padding-right: 12px !important;
	            }
	         }

	        /* Description Overlay Pattern CSS */
	        @media only screen and (max-width: 599px) {
	                table { width: 100%; }
	                td[class=container] {
	                    background-size: auto 100%;
	                    background-position: center top;
	                    width: 100%;
	                    height: auto;
	                    min-height: 200px;
	                    padding-top: 100px !important;
	                }
	                td[class=spacer] { display: none; height: 0;}
	            }

	        /* styles */
	        @media only screen and (max-width: 500px) {
	          html { -webkit-text-size-adjust:none; -ms-text-size-adjust:none; }

	          /* IMPORTANT: Change according to the picture used !! */
	          .header-image{width:600px!important; height:448px!important;}

	        }

	        </style>

	</head>

	<body style="margin:0;" rightmargin="0" leftmargin="0" topmargin="0" bottommargin="0" bgcolor="#ebebeb">

	<!-- 100% wrapper (grey background) -->
	<table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#ebebeb">
		<tbody>
	        <tr>
	            <td>

	                <!-- 600px container (white background) -->
	                <table border="0" width="600" cellpadding="0" cellspacing="0" class="container" align="center" bgcolor="#ffffff">
	                    <tbody>
	                        <tr>
	                            <td class="container-padding" bgcolor="#ffffff" style="background-color: #ffffff; padding-left: 30px; padding-right: 30px; font-size: 14px; line-height: 20px; font-family: Helvetica, sans-serif; color: #333;">


	                                <br>

	                                <!-- ### BEGIN CONTENT ### -->
	                                <div style="font-weight: bold; font-size: 18px; line-height: 24px; color: #D03C0F">
	                                Basic Email Container
	                                </div><br>

	                            	<!-- NOTE: Change the title and alt to the message in the image -->
	                                <img src="http://images.gizur.com.s3-website-eu-west-1.amazonaws.com/lindsey.jpg" 
	                                    class="header-image" 
	                                    title="Tillbaka från semestern" 
	                                    alt="Välkommen tillbka från semestern" 
	                                    width="600" height="448" border="0" 
	                                    style="display:block;"/>

	                                <br><br>
	                                

	                                The 100% wrapper <span style="font-family: Andale Mono, Courier, monospace; color: #666;">&lt;table&gt;</span> is included for clients that strip out the <span style="font-family: Andale Mono, Courier, monospace; color: #666;">&lt;body&gt;</span> tag. Change background color as required.
	                                <br><br>


	                                The inner <span style="font-family: Andale Mono, Courier, monospace; color: #666;">&lt;table&gt;</span> with <span style="font-family: Andale Mono, Courier, monospace; color: #666;">container</span> class has the following functions:
	                                <br><br>

	                                <strong>On desktop:</strong>
	                                <ul>
	                                    <li>Wraps the email to a max recommended width of <span style="font-family: Andale Mono, Courier, monospace; color: #666;">600px</span></li>
	                                    <li>Adds <span style="font-family: Andale Mono, Courier, monospace; color: #666;">30px</span> left and right padding. (Hint: that means you have <span style="font-family: Andale Mono, Courier, monospace; color: #666;">540px</span> for content.</li>
	                                </ul>

	                                <strong>On mobile:</strong>
	                                <ul>
	                                    <li>Wraps email to fluid <span style="font-family: Andale Mono, Courier, monospace; color: #666;">95%</span></li>
	                                    <li>Reduces left and right padding to <span style="font-family: Andale Mono, Courier, monospace; color: #666;">12px</span> for more content real estate</li>
	                                    <li>See breakpoints in CSS</li>
	                                </ul>
	                                <br>

	                                <em style="font-style:italic; font-size: 12px; color: #aaa;">N.B. The above is provided as explanation only and has not been live tested in clients.</em>
	                                <br><br>

	                                <div style="font-weight: bold; font-size: 18px; line-height: 24px; color: #D03C0F">
	                                The world scouts at us whale hunters
	                                </div>
	                                <br>

	                                At the same foam-fountain, Queequeg seemed to drink and reel with me. His dusky nostrils swelled apart;
	                                he showed his filed and pointed teeth. On, on we flew; and our offing gained, the Moss did homage to the
	                                blast; ducked and dived her bows as a slave before the Sultan. Sideways leaning, we sideways darted; every
	                                ropeyarn tingling like a wire; the two tall masts buckling like Indian canes in land tornadoes.
	                                <br><br>

	                                So full of this reeling scene were we, as we stood by the plunging bowsprit, that for some time we did not
	                                notice the jeering glances of the passengers, a lubber-like assembly, who marvelled that two fellow beings
	                                should be so companionable; as though a white man were anything more dignified than a whitewashed negro.
	                                <br><br>

	                                <em style="font-style:italic; font-size: 12px; color: #aaa;">Excerpt from Moby Dick, by Herman Melville</em>
	                                <br><br>


	                            </td>
	                        </tr>                        

	                    </tbody>
	                    <tfoot>
	                </table>

	            </td>
	        </tr>
	    </tbody>
	</table>

	</body>
	</html>
