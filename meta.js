const $fs = require('fs');
const $path = require('path');

module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "label": "Project name, no space or punctuations, for example: my-project"
    },
    "package": {
      "type": "string",
      "required": true,
      "label": "android package, for example: com.company.project"
    },
    "description": {
      "type": "string",
      "required": true,
      "label": "Project description",
      "default": "A Kotlin JavaFX Project"
    },
    "group": {
      "type": "string",
      "required": true,
      "label": "Your group ID",
      "default": "me.name"
    },
    "author": {
      "type": "string",
      "label": "Author"
    }
  },
  complete: function (data, opts) {
    const cwd = $path.join(process.cwd(), data.inPlace ? '' : data.destDirName);
    const name = data.name;

    // create folders
    const pkg = `src/main/kotlin/${data.package.replace(/\./g, '/')}`;
    [/*'libs'*/, pkg, 'src/main/resources', 'src/test/kotlin', 'src/test/kotlin/resources'].forEach(function(dir){
      console.log(`creating ${dir} folder`);
      $fs.mkdirSync($path.resolve(cwd, `${dir}`), {recursive: true});
    });
    $fs.writeFileSync($path.join(cwd, pkg, 'Main.kt'), 
`import javafx.application.Application
import javafx.scene.Scene
import javafx.scene.control.Label
import javafx.scene.layout.StackPane
import javafx.stage.Stage


class Main : Application() {
    override fun start(stage: Stage) {
        val javaVersion = System.getProperty("java.version")
        val javafxVersion = System.getProperty("javafx.version")
        val l = Label("Hello, JavaFX $javafxVersion, running on Java $javaVersion.")
        val scene = Scene(StackPane(l), 640.0, 480.0)
        stage.scene = scene
        stage.show()
    }
}

fun main(args: Array<String>) = Application.launch(Main::class.java, *args)
`);
  },
  "skipInterpolation": []
}