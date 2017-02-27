##Sudofont

Sudomemo Theatre icon font, with polyfills for the Nintendo DS' special font characters.

###What we needed

Ever since the launch of the Nintendo DS, Nintendo consoles have had a set of special characters added into the internal system font. On [Sudomemo](www.sudomemo.net), users can set their username through their Nintendo DSi console, with the option of using these special characters.

These usernames need to display on the Sudomemo Theatre website for PC and mobile devices. Flipnote Hatena did this by inserting .gif images for the characters into the text, however we thought that we could find a better approach since it's not 2008 anymore.

We created a font that includes glyphs mapped to the unicode codepoint for each Nintendo DS special character that can appear in a username, thanks to the power of webfonts, we can use this to provide "native" support for these characters within a webpage.

We also decided to append our own icon-font to this set, so as such Sudofont also serves additional purpose of providing the UI icons for Sudomemo Theatre, killing two birds with one stone.

###Building

For only requirement for building Sudofont yourself is [NodeJS](https://nodejs.org), once you have it set up on your system, clone or download this repository, then `cd` into the directory:

#### Install the dependencies:

`npm install`

#### Run the build script:

`npm run build`

###Mapping table

| NDS character | NDS hex | Emoji                | Emoji shortcode    | Char | Hex |
|:--------------|:--------|:---------------------|:-------------------|:-----|:---------|
| A button      | 0xE000  | n/a                  | n/a                | Ⓐ   | 0x24B6    |  
| B button      | 0xE001  | n/a                  | n/a                | Ⓑ   | 0x24B7    |
| X button      | 0xE002  | n/a                  | n/a                | Ⓧ   | 0x24CD    |
| Y button      | 0xE003  | n/a                  | n/a                | Ⓨ   | 0x24CE    |
| L button      | 0xE004  | n/a                  | n/a                | Ⓛ   | 0x24C1    |
| R button      | 0xE005  | n/a                  | n/a                | Ⓡ   | 0x24C7    |
| D-pad         | 0xE006  | :heavy_plus_sign:    | heavy_plus_sign    | ➕   | 0x2795   |
| Alarm         | 0xE007  | :alarm_clock:        | alarm_clock        | ⏰   | 0x23F0   |
| Happy face    | 0xE008  | :smiley:             | smiley             | 😃   | 0x0001F603 |
| Angry face    | 0xE009  | :angry:              | angry              | 😠   | 0x0001F620 |
| Sad face      | 0xE00A  | :pensive:            | pensive            | 😔   | 0x0001F614 |
| Neutral face  | 0xE00B  | :expressionless:     | expressionless     | 😑   | 0x0001F611 |
| Sun           | 0xE00C  | :sunny:              | sunny              | ☀    | 0x2600   |
| Cloud         | 0xE00D  | :cloud:              | cloud              | ☁    | 0x2601   |
| Umbrella      | 0xE00E  | :umbrella:           | umbrella           | ☔    | 0x2614   |
| Snowman       | 0xE00F  | :snowman:            | snowman            | ⛄   | 0x26C4   |
| Exclamation   | 0xE010  | :exclamation:        | exclamation        | ❗   | 0x2757   |
| Question      | 0xE011  | :question:           | question           | ❓   | 0x2753   |
| Envelope      | 0xE012  | :envelope:           | envelope           | ✉    | 0x2709   |
| Phone         | 0xE013  | :iphone:             | iphone             | 📱   | 0x0001F4F1 |
| Spade         | 0xE015  | :spades:             | spades             | ♠    | 0x2660   |
| Diamond       | 0xE016  | :diamonds:           | diamonds           | ♦    | 0x2666   |
| Heart         | 0xE017  | :hearts:             | hearts             | ♥    | 0x2665   |
| Club          | 0xE018  | :clubs:              | clubs              | ♣    | 0x2663   |
| Right arrow   | 0xE019  | :arrow_right:        | arrow_right        | ➡    | 0x27A1   |
| Left arrow    | 0xE01A  | :arrow_left:         | arrow_left         | ⬅   | 0x2B05   |
| Up arrow      | 0xE01B  | :arrow_up:           | arrow_up           | ⬆   | 0x2B06   |
| Down arrow    | 0xE01C  | :arrow_down:         | arrow_down         | ⬇   | 0x2B07   |
| Cross         | 0xE028  |:heavy_multiplication_x:|heavy_multiplication_x| ✕  | 0x2715   |

###Credits

* [Wakaba](https://github.com/wakaba) - For open-sourcing this very helpful [Hatena NDS emoji mapping table](https://github.com/wakaba/hatena-emoji-data/blob/master/tables/hatena-00e000.txt)

* [Typicons](https://github.com/stephenhutchings/typicons.font) - Used as a base for some of the icons
