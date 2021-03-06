import { PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, Input, InputNumber, Modal, Space, Upload, Form, Spin } from 'antd'
import { RcFile, UploadFile } from 'antd/lib/upload/interface'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import ConsoleLayout from '../../../components/ConsoleLayout'
import { useUploadImage } from '../../../graphql/image'
import { ITEM, useItem, useUpdateItem } from '../../../graphql/item'
import getBase64 from '../../../lib/getBase64'
import fetcher from '../../../lib/SSRQueryFetcher'

interface ImageFile {
    url: string
    status: string
    name: string
    uid: string
}

const Container = styled.div({
    padding: 64
})

const FormContainer = styled(Space)({
    width: 360,
    marginTop: 24
})


const ItemDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const { data } = useItem({ variables: { itemId: Number(id) } })
    const [updateItemRequest, { loading, error }] = useUpdateItem()
    const [uploadImageRequest] = useUploadImage()

    const [isModify, setIsModify] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [fileList, setFileList] = useState<ImageFile[]>(
        data?.item.images.map(({ src, id }) => ({
            name: id.toString(),
            uid: id.toString(),
            url: src,
            status: 'done'
        })) || []
    )
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        if (error && error.message) toast.error(error.message)
    }, [error])

    const onFinish = useCallback(async (values) => {
        if (!isModify) setIsModify(true)
        else if (fileList.length === 0) toast.error('Image must be more one')
        else {
            console.log(values)
            console.log(fileList)
            const { price, name, published } = values
            await updateItemRequest({
                variables: {
                    itemId: Number(id),
                    price: Number(price),
                    name,
                    published: published || false,
                    images: fileList.map(({ name }) => Number(name))
                }
            })
            router.back()
        }
    }, [isModify, id, fileList])

    const onFinishFailed = useCallback((errorInfo) => {
        console.log('Failed:', errorInfo);
    }, [])

    const onPreview = useCallback(async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
    }, [])

    const onRemove = useCallback((file: UploadFile<any>) => {
        setFileList(fileList.filter(({ uid }) => uid !== file.uid))
        return false
    }, [fileList])

    //@ts-ignore
    const onBeforeUpload = useCallback(async (file: RcFile, FileList: RcFile[]) => {
        try {
            if (uploadLoading) return
            setUploadLoading(true)
            const { data } = await uploadImageRequest({ variables: { image: file } })
            if (!data) throw Error('Invalid data')
            const { id, src } = data?.uploadImage
            const newData: ImageFile = ({
                name: id.toString(),
                status: 'done',
                uid: id.toString(),
                url: src
            })
            setFileList([...fileList, newData])
        } catch (error) {
            console.log(error)
        }
        setUploadLoading(false)
        return
    }, [uploadLoading, fileList])

    const onModalPreviewCancel = useCallback(() => setPreviewVisible(false), [])


    return (
        <ConsoleLayout>
            <Container>
                <Upload
                    disabled={!isModify || uploadLoading}
                    //@ts-ignore
                    fileList={fileList}
                    listType='picture-card'
                    onPreview={onPreview}
                    beforeUpload={onBeforeUpload}
                    onRemove={onRemove}
                >
                    {fileList.length <= 8 && isModify && <div>
                        {uploadLoading ? <Spin /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>}
                </Upload>
                <Form
                    name='item'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormContainer direction='vertical' >

                        <Form.Item
                            name='name'
                            initialValue={data?.item.name}
                            rules={[
                                { required: isModify }
                            ]}
                        >
                            <Input disabled={!isModify} placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name='price'
                            initialValue={data?.item.price}
                            rules={[
                                {
                                    type: 'number',
                                    required: isModify
                                }
                            ]}
                        >
                            <InputNumber disabled={!isModify} placeholder="Price" style={{ width: 200 }} />
                        </Form.Item>
                        <Form.Item
                            name="published"
                            valuePropName="checked"
                            initialValue={data?.item.published}
                        >
                            <Checkbox disabled={!isModify}>Publish</Checkbox>
                        </Form.Item>
                        <Form.Item >
                            <Button
                                loading={loading}
                                type={isModify ? 'primary' : 'default'}
                                htmlType='submit'
                            >
                                {isModify ? 'Confirm' : 'Edit'}
                            </Button>
                        </Form.Item>
                    </FormContainer>
                </Form>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={onModalPreviewCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Container>
        </ConsoleLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const initialApolloState = await fetcher(context, [{ query: ITEM, variables: { itemId: Number(context.params?.id) } }])
    return { props: { initialApolloState } }
}


export default ItemDetail
