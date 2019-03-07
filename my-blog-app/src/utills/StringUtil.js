class StringUtil {
    static dealWithContent(cotent) {
        return cotent.length < 200 ? cotent : cotent.substring(0, 200)
    }
}

export default StringUtil;