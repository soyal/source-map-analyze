;(function() {
  const $ = document.querySelector.bind(document)
  const $all = document.querySelectorAll.bind(document)

  const $uploader = $('#uploader')

  $uploader.addEventListener('change', e => {
    const file = $uploader.files[0]
    const formData = new FormData()

    formData.append('sourcemap', file)

    // 上传source map
    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          const $inputBlock = $('#info-input-block')

          $inputBlock.style.display = 'block'

          const $submit = $('#submit')
          $submit.addEventListener('click', e => {
            const $column = $('#column')
            const $row = $('#row')

            // 请求分析接口
            fetch(`/api/analyze?column=${$column.value}&row=${$row.value}&filename=${file.name}`, {
              method: 'GET'
            }).then(res => res.json())
            .then(res => {
              if(res.success && res.data) {
                const $resultComponent = $('#result-component')
                const $resultRow = $('#result-row')
                const $resultColumn = $('#result-column')

                const { data } = res
                $resultComponent.textContent = data.source
                $resultRow.textContent = data.line
                $resultColumn.textContent = data.column
              }
            })
          })
        }
      })
  })
})()
