import EButton from "../../../../../../components/EButton"
import { useFontCollection } from "../../../../../../context/FontCollectionContext/CollectionProvider"
import { memo, useState } from "react"
import { createStyleURLFromCollection } from "../../../../../../googleApiUtils"

const SHOW_LINK = 0
const SHOW_IMPORT = 1

const InstructionDrawer = () => {

    const { collection } = useFontCollection()
    const [ mode, setMode ] = useState(SHOW_LINK)
    const linkURL = createStyleURLFromCollection(collection)

    const handleSetLinkMode = () => {
        setMode(SHOW_LINK)
    }

    const handleSetImportMode = () => {
        setMode(SHOW_IMPORT)
    }

    return (
        <section className="min-h-[360px] border-t p-4 flex-1 overflow-y-auto">
                <h3 className="text-sm font-medium">Use on the web</h3>
                <p className="text-sm text-zinc-500 mt-4">To embed a font, copy the code into the 	&lt;head&gt; of your html</p>

                <div className="flex justify-center bg-slate-100 my-2 text-sm text-slate-700">
                    <EButton className={`flex-1 p-2 transition-colors ${mode === SHOW_LINK && "bg-blue-400 text-white"}`}
                        onClick={handleSetLinkMode}
                    >
                        Link
                    </EButton>
                    <EButton className={`flex-1 p-2 transition-colors ${mode === SHOW_IMPORT && "bg-blue-400 text-white"}`}
                        onClick={handleSetImportMode}
                    >
                        Import
                    </EButton>
                </div>

                {mode === SHOW_LINK
                ? <div className="p-2 bg-slate-100 break-words mt-4 flex flex-col gap-2 text-[13px] text-slate-700">
                    <code className="inline-block whitespate-normal break-words">
                    {`<link rel="preconnect" href="https://fonts.googleapis.com">`}
                    </code>
                    <code className="inline-block whitespate-normal break-words">
                    {`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`}
                    </code>
                    <code className="inline-block whitespate-normal break-words">
                    {`<link href="${linkURL}&display=swap" rel="stylesheet">`}
                    </code>
                </div>
                : <div className="p-2 bg-slate-100 break-words mt-4 flex flex-col gap-2 text-[13px] text-slate-700">
                    <code>{`<style>`}</code>
                    <code className="inline-block whitespate-normal break-words">
                        {`@import url('${linkURL}&display=swap');`}
                    </code>
                    <code>{`</style>`}</code>
                </div>
                }

                <h3 className="mt-6 text-sm text-slate-700">CSS rules to specify families</h3>
                <div className="p-2 bg-slate-100 break-words mt-2 flex flex-col gap-2 text-[13px] text-slate-700c">
                    {Object.keys(collection).map(family => (
                        <code key={family}>
                            font-family: &apos;{family}&apos;, {collection[family].category};
                        </code>
                    ))}
                </div>
        </section>
    )
}

export default memo(InstructionDrawer)