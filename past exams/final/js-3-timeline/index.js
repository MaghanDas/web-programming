const canvas = document.querySelector('#timeline-canvas')
const ctx = canvas.getContext('2d')

// ================= Canvas defaults =================
ctx.font = '10px Arial'
ctx.textBaseline = 'middle'
ctx.lineWidth = 0.5

// ================= Constants =================
const rowHeight = 50
const axisY = canvas.height - 60

const financingColors = {
    community: '#009966',
    municipality: '#9933cc',
    national: '#cc0000',
    eu: '#0066cc',
    industry: '#cc8800',
    private: '#898282'
}

// Timeline: June 2025 → June 2031
const minDate = 2025 * 12 + 5   // June 2025
const maxDate = 2031 * 12 + 5   // June 2031
const dateRange = maxDate - minDate + 1
const monthWidth = canvas.width / dateRange

// ================= Helpers =================
function truncateText(text, maxWidth) {
    let truncated = text
    while (ctx.measureText(truncated).width > maxWidth && truncated.length > 0) {
        truncated = truncated.slice(0, -1)
    }
    return truncated.length < text.length ? truncated + '...' : truncated
}

function dateToMonthIndex(dateStr) {
    const [year, month] = dateStr.split('-').map(Number)
    return year * 12 + (month - 1)
}

// ================= Base chart =================
function drawChartBase() {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // X axis
    ctx.strokeStyle = '#333'
    ctx.beginPath()
    ctx.moveTo(0, axisY)
    ctx.lineTo(canvas.width, axisY)
    ctx.stroke()

    for (let i = 0; i <= dateRange; i++) {
        const monthIndex = minDate + i
        const month = (monthIndex % 12) + 1
        const x = i * monthWidth
        const isYearStart = month === 1

        ctx.strokeStyle = isYearStart ? '#333' : '#e0e0e0'
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, axisY)
        ctx.stroke()

        ctx.fillStyle = '#333'
        ctx.textAlign = 'center'
        ctx.fillText(month, x, canvas.height - 50)

        if (isYearStart) {
            ctx.fillStyle = '#000'
            ctx.fillText(Math.floor(monthIndex / 12), x, canvas.height - 35)
        }
    }
}

// ================= Projects =================
function drawRectangles() {
    projects.forEach((project, index) => {
        const startIndex = dateToMonthIndex(project.startSchedule)
        const endIndex = dateToMonthIndex(project.schedule)

        const xStart = (startIndex - minDate) * monthWidth
        const xEnd = (endIndex - minDate) * monthWidth
        const y = axisY - (index + 1) * rowHeight

        const color = financingColors[project.financing] || '#000'

        // Line
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(xStart, y)
        ctx.lineTo(xEnd, y)
        ctx.stroke()

        // Start circle
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(xStart, y, 4, 0, Math.PI * 2)
        ctx.fill()

        // End circle
        ctx.beginPath()
        ctx.arc(xEnd, y, 4, 0, Math.PI * 2)
        ctx.fill()

        // Label
        ctx.fillStyle = '#000'
        ctx.textAlign = 'left'
        const textX = xEnd + 6
        const maxTextWidth = canvas.width - textX - 5
        ctx.fillText(
            truncateText(project.name, maxTextWidth),
            textX,
            y
        )
    })
}

// ================= Draw =================
drawChartBase()
drawRectangles()
