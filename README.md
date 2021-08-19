# mzettle README


mzettle (Markdown zettlekasten) is an extension to facilitate the creation of 
your own [zettlekasten](https://writingcooperative.com/zettlekasten-how-one-german-scholar-was-so-freakishly-productive-997e4e0ca125) 
using customizable markdown files.

## Usage

Create a new note using the command palette (CMD/CTRL + Shift + P).
```
CMD + Shift + P -> mzettle note
```

It will prompt you to enter the title of the note and will build and open a 
preformatted note in the current workspace.


<p align="center">
  <img src="https://raw.githubusercontent.com/monferrand/mzettle/master/docs/note_creation.gif" alt="Toggle Marp preview" width="600" />
</p>


```
CMD + Shift + P -> mzettle note link to clipboard
```
Prepare a markdown link for the current note and put it to the clipboard.

### Keyboard Shortcuts

 - Use `alt + z` to create a new note.
 - Use `alt + l` to send the current note link to the clipboard.


### Configurations

- `mzettle.notesPath`: Give the path were to put the zettlekasten notes. If not set will put the note in the current folder.
- `mzettle.notesTemplate`: The template to use for the notes. You can use ${date} and ${title} parameters.
- `mzettle.filenameTemplate`: The template to use for the note file name. You can use ${date}, ${time} and ${title} parameters. It's an array of string. A new line is created for each element of the array.
- `mzettle.titleSeparator`: Character(s) used to replace the spaces the in title for the filename. 