const canvas  = document.querySelector('canvas')
const ctx     = canvas.getContext('2d')
const slider  = document.querySelector("input[type=range]");
const button  = document.querySelector('#draw')
const select  = document.querySelector('select')

ctx.lineWidth = 4
ctx.strokeStyle = 'black'

