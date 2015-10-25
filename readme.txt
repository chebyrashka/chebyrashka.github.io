This repo contains the site files for the Invision Front End Development coding exercise. The notes below are to clarify key elements and thought process when coding the exercise.

The two url's to test are: 
http://chebyrashka.github.io/
http://chebyrashka.github.io/settings

Built using LESS, jQuery, Gulp, and Jekyll

General Notes
- Pages designed for IE9+, Chrome, and Firefox. Testing was also done on tablets.
- I created '2x' images off of the '1x' images to optimize the display on devices that can utilize them.
- The pages are accessible friendly via tabbing and added :focus events for visual cues.
- The templates are responsive but 'mobile' designs weren't provided so only optimized down to tablet format.
- Hover states weren't specified so I used my best judgement based off of layer differences in the PSD files.
- I kept the unminified and less files with the project so you can review easier.
- I only saw one instance using the Proxima Nova font and loaded that through Adobe TypeKit

Homepage Notes
- The grid uses a plugin to create the columns, I opted to use this for all browsers opposed to doing a plugin for IE and native CSS columns for Chrome/Firefox.
- I animated the typing cursor background based off PSD comp showing a vertical line to the left of the text.
- Modal for 'Create new message' loads seperate HTML file.
- Lightbox for photos/videos functions (video lightbox wasn't designed so it only displays a still image).
- Coded the filter for viewing just photos or video. The javascript for this should be refactored though (but it functions).
- The initial load of the page just shows the first 5 entries to emulate the functionality of clicked 'Load More' below the tiles.

Settings Page
- The PSD and Invision mockup weren't clear on the functionality of the password fields. I took my best guess.
- I used the visual style provided for the checkboxes and radio buttons, however the checkboxes under Privacy might be better to use the toggle switches like in Notifications.

