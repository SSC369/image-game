import './index.css'

const TabItem = props => {
  const {tab, isActive, onSelectTab} = props
  const {tabId, displayText} = tab
  const onClickTab = () => {
    onSelectTab(tabId)
  }

  const tabClass = isActive ? 'selected-tab' : ''

  return (
    <li className="tab-item">
      <button
        type="button"
        className={`tab-button ${tabClass}`}
        onClick={onClickTab}
      >
        {displayText}
      </button>
    </li>
  )
}
export default TabItem
