# Mzettel README


Mzettel (Markdown ZETTELkasten) is an extension to facilitate the creation of 
your own [Zettelkasten](https://writingcooperative.com/zettelkasten-how-one-german-scholar-was-so-freakishly-productive-997e4e0ca125) 
using markdown files.

## Usage

Create a new note using the command palette (CMD/CTRL + Shift + P).
```
CMD + Shift + P -> Mzettel note
```

It will prompt you to enter the title of the note and will build and open a 
preformatted note in the current workspace.


<p align="center">
  <img src="https://raw.githubusercontent.com/monferrand/mzettel/master/docs/note_creation.gif" alt="Toggle Marp preview" width="600" />
</p>


```
CMD + Shift + P -> Mzettel note link to clipboard
```
Prepare a markdown link for the current note and put it to the clipboard.

### Keyboard Shortcuts

 - Use `alt + z` to create a new note.
 - Use `alt + l` to send the current note link to the clipboard.


### Configurations

- `mzettel.notesPath`: Give the path were to put the zettelkasten notes. If not set will put the note in the current folder.
- `mzettel.notesTemplate`: The template to use for the notes. You can use ${date} and ${title} parameters.
