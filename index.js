#!/usr/bin/env node
'use strict'

const path = require('path')
const process = require('process')
const fs = require('fs')

const DIRPATH = process.argv[2] || process.cwd()
const imagefiles = []
const files = fs.readdirSync(DIRPATH).filter(file => file.match(/.*\.(GIF|PNG|JPG|JPEG|jpeg|SVG)$/))

class ImageFile {
  constructor (file) {
    this.extname = path.extname(file)
    this.filename = path.basename(file, this.extname)
  }

  get oldName () {
    return this.filename + this.extname
  }

  get newName () {
    let newExtname = this.extname.toLowerCase()
    if (newExtname === '.jpeg') newExtname = '.jpg'
    return this.filename + newExtname
  }
}

for (const file of files) imagefiles.push(new ImageFile(file))

if (imagefiles.length) {
  for (const imagefile of imagefiles) {
    const oldPath = path.join(DIRPATH, imagefile.oldName)
    const newPath = path.join(DIRPATH, imagefile.newName)
    fs.renameSync(oldPath, newPath)
    console.log(`${imagefile.oldName} was renamed to ${imagefile.newName}!`)
  }
} else {
  console.log(`No image file exists in ${DIRPATH}!`)
}
