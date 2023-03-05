const sharp = require(`sharp`)
const { glob } = require(`glob`)
const fs = require(`fs-extra`)

// change this to the folder name for a new blog post
// be careful not to optimise images that were already optimised
const matches = glob.globSync(`src/posts/xxxxx/*.{png,jpg,jpeg}`)
const MAX_WIDTH = 1100
const QUALITY = 90

Promise.all(
  matches.map(async match => {
    const stream = sharp(match)
    const info = await stream.metadata()

    if (info.width < MAX_WIDTH) {
      return
    }

    const optimizedName = match.replace(
      /(\..+)$/,
      (match, ext) => `-optimized${ext}`
    )

    await stream
      .resize(MAX_WIDTH)
      .jpeg({ quality: QUALITY })
      .toFile(optimizedName)

    return fs.rename(optimizedName, match)
  })
)