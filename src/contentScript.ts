import { keyBy } from 'lodash'

interface Property {
  id: number
  displaySize: string
}

async function fetchProperties (): Promise<Property[]> {
  const channel = location.pathname.includes('property-for-sale') ? 'BUY' : 'RENT'
  const searchUrl = `${location.origin}/api/_search${location.search}&channel=${channel}`

  const response = await fetch(searchUrl)
  const jsonModel = await response.json()
  return jsonModel.properties
}

function enhanceSearchResults (properties: Property[]) {
  const propertiesById = keyBy(properties, p => p.id)

  const propertyCards = Array.from(document.querySelectorAll('.l-searchResult.is-list'))
  for (const card of propertyCards) {
    const id = +card.id.replace(/property-(.*)/, '$1')
    const property = propertiesById[id]
    if (property) {
      enhanceSearchResult(card, propertiesById[id])
    }
  }
}

function enhanceSearchResult (card: Element, property: Property) {
  const propertyInfoBar = card.querySelector('.property-information')!!

  const size = +property.displaySize.replace(/(.*) sq. ft./, '$1')
  if (size) {
    const separator = document.createElement('span')
    separator.className = 'seperator'
    separator.textContent = '|'

    const squareFeet = document.createElement('span')
    squareFeet.className = 'text'
    squareFeet.textContent = `${size} sq. ft.`

    propertyInfoBar.appendChild(separator)
    propertyInfoBar.appendChild(squareFeet)
  }
}

async function onPageChanged () {
  if (location.pathname.endsWith('/find.html')) {
    const properties = await fetchProperties()
    enhanceSearchResults(properties)
  }
}

chrome.runtime.onMessage.addListener(onPageChanged)
