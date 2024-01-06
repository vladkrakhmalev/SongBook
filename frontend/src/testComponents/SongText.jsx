import ContentEditable from "react-contenteditable";

export default function SongText({blocks, sizeText, disabled, handleChange}) {
  const disabledClass = disabled ? " _disabled" : ''
  let countBlock = 0

  function handleChangeText(index, prop, e) {
    blocks[index][prop] = e.target.value
    handleChange(blocks, 'text')
  }

  function addBlock() {
    blocks.push({type: '',value: ''})
    handleChange(blocks, 'text')
  }

  function deleteBlock(index) {
    blocks.splice(index, 1)
    handleChange(blocks, 'text')
  }  
  
  return <div className="song__texts">
    {blocks.map((block, index) =>

      <div key={index} className={'song__text' + disabledClass}>
        
        {disabled
        ? <div className={'song__text-type' + disabledClass}>
            {(block.type === 'Куплет' ? ++countBlock + ' ' : '') + block.type}
          </div>
        : <div className="song__text-header">

            <select
              className="song__text-select"
              value={block.type}
              style={{fontSize: sizeText}} 
              onChange={e => handleChangeText(index, 'type', e)}
            >
              <option value=''>Выберете тип блока</option>
              <option value='Куплет'>Куплет</option>
              <option value='Припев'>Припев</option>
            </select>

            <div
              className="panel__btn _small _light _delete"
              onClick={() => deleteBlock(index)}
            ></div>

          </div>
        }
        
        <ContentEditable
          className={'song__text-value' + disabledClass}
          disabled={disabled}
          html={block.value}
          style={{fontSize: sizeText}}  
          onChange={e => handleChangeText(index, 'value', e)}
        />
        
      </div>
    )}

    {disabled ? '' :
      <div
        className="panel__btn _add _light _small song__btn"
        onClick={addBlock}
      >Добавить блок</div>
    }

  </div>
}