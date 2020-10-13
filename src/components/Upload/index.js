import React, { useEffect } from 'react'
import { Upload as AntdUpload } from 'antd'
import useUpload from 'hooks/useUpload'
import useDidMountEffect from 'hooks/useDidMountEffect'

const Upload = ({
  name,
  listType,
  onChange,
  defaultFileList = [],
  children,
  maxCount,
  ...rest
}) => {
  const uploadProps = useUpload(maxCount)
  const { fileList, setFileList } = uploadProps

  useEffect(() => {
    console.log(defaultFileList)
    if (defaultFileList && defaultFileList.length > 0) setFileList(defaultFileList)
  }, [defaultFileList])

  useEffect(() => {
    console.log('file list changed')
  }, [fileList])

  useDidMountEffect(() => {
    if (onChange) onChange(fileList, name)
  }, [fileList])

  return (
    <AntdUpload {...rest} name={name} listType={listType} {...uploadProps}>
      {children}
    </AntdUpload>
  )
}

Upload.defaultProps = {
  name: '',
  listType: 'picture-card',
  maxCount: 0,
}

Upload.displayName = `Upload`

export default Upload
