import axios from "axios";
import {ElMessage} from "element-plus";
import {getAccess} from "@/utils/getAccess.js";

export const uploadService = async (form, callback = (ossData) => {}, generateFileName = (ossData, file) => {}) => {
    await axios.get('http://localhost:3000/oss/signature', {
        headers: {
            Authorization: `Bearer ${getAccess()}`,
        }
    }).then(async (res) => {
        if (res.data.code === 200) {
            const ossData = res.data;
            const file = form.url[0]
            const key = await generateFileName(ossData, file)

            const formData = new FormData()

            formData.append('key', key)
            formData.append('OSSAccessKeyId', ossData.accessId)
            formData.append('policy', ossData.policy)
            formData.append('signature', ossData.signature)
            formData.append('success_action_status', '200')
            formData.append('file', form.url[0].raw)

            axios.post(ossData.host, formData).then((res) => {
                if (res.status === 200) {
                    console.log('上传成功')
                }
            }).catch((err) => {
                console.log(err)
            })
            const rollBack = async () => {
                await callback(ossData)
                console.log('执行回调函数')
            }
            await rollBack()
        } else {
            ElMessage({
                type: 'error',
                message: res.data.message,
            })
        }
    }).catch((err) => {
        console.log(err)
    })
}