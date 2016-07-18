var spec = require('./lib/spec')

var modPath = '../../server_mods/com.wondible.pa.puppetmaster_cinematic/'
var stream = 'stable'
var media = require('./lib/path').media(stream)
var hack = require('./lib/path').media('hack')
var drop_pod = 'pa/puppetmaster/drop_pod.pfx'

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    copy: {
      mod: {
        files: [
          {
            src: [
              'modinfo.json',
              'LICENSE.txt',
              'README.md',
              'CHANGELOG.md',
              'icon.png',
              'ui/**',
              'pa/**'],
            dest: modPath,
          },
        ],
      },
      hack: {
        files: [
          {
            src: drop_pod,
            dest: hack + drop_pod,
          },
        ],
      },
    },
    proc: {
      droppod: {
        src: [
          'pa/effects/specs/default_commander_landing.pfx'
        ],
        cwd: media,
        dest: drop_pod,
        process: function(spec) {
          spec.emitters = spec.emitters.filter(function(emit) {
            // white shell / smoke shell
            return emit.spec.papa != '/pa/effects/fbx/particles/sphere_ico16seg.papa' &&
              emit.spec.shader != 'meshParticle_clip_smoke_bend' &&
              emit.spec.baseTexture != '/pa/effects/textures/particles/ring.papa' && 
              emit.spec.baseTexture != '/pa/effects/textures/particles/flat.papa'
          })
          spec.emitters.forEach(function(emit) {
            if (emit.spec.baseTexture == '/pa/effects/textures/particles/sharp_flare.papa' && emit.offsetZ == 900) {
              emit.spec.red = emit.spec.green = emit.spec.blue = 1
              if (emit.sizeX > 75) {
                emit.useArmyColor = 1
              } else {
                emit.useArmyColor = 2
              }
            } else if (emit.spec.baseTexture == '/pa/effects/textures/particles/softSmoke.papa' && emit.type == 'Cylinder_Z') {
              // large expanding dust
              emit.alpha[0][1] = 0.15
            } else if (emit.spec.shape == 'pointlight') {
              // bright blusih glow
              emit.alpha = 0.05
            }
          })
          return spec
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerMultiTask('proc', 'Process unit files', function() {
    if (this.data.targets) {
      var specs = spec.copyPairs(grunt, this.data.targets, media)
      spec.copyUnitFiles(grunt, specs, this.data.process)
    } else {
      var specs = this.filesSrc.map(function(s) {return grunt.file.readJSON(media + s)})
      var out = this.data.process.apply(this, specs)
      grunt.file.write(this.data.dest, JSON.stringify(out, null, 2))
    }
  })

  // Default task(s).
  grunt.registerTask('default', ['proc', 'copy:mod']);

};

