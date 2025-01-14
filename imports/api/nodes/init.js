import { NodeInfoCollection } from "./collection"

const nodeInfoKsampler = `{
  "KSampler": {
    "input": {
      "required": {
        "model": [
          "MODEL",
          {
            "tooltip": "The model used for denoising the input latent."
          }
        ],
        "seed": [
          "INT",
          {
            "default": 0,
            "min": 0,
            "max": 18446744073709551615,
            "tooltip": "The random seed used for creating the noise."
          }
        ],
        "steps": [
          "INT",
          {
            "default": 20,
            "min": 1,
            "max": 10000,
            "tooltip": "The number of steps used in the denoising process."
          }
        ],
        "cfg": [
          "FLOAT",
          {
            "default": 8.0,
            "min": 0.0,
            "max": 100.0,
            "step": 0.1,
            "round": 0.01,
            "tooltip": "The Classifier-Free Guidance scale balances creativity and adherence to the prompt. Higher values result in images more closely matching the prompt however too high values will negatively impact quality."
          }
        ],
        "sampler_name": [
          [
            "euler",
            "euler_cfg_pp",
            "euler_ancestral",
            "euler_ancestral_cfg_pp",
            "heun",
            "heunpp2",
            "dpm_2",
            "dpm_2_ancestral",
            "lms",
            "dpm_fast",
            "dpm_adaptive",
            "dpmpp_2s_ancestral",
            "dpmpp_2s_ancestral_cfg_pp",
            "dpmpp_sde",
            "dpmpp_sde_gpu",
            "dpmpp_2m",
            "dpmpp_2m_cfg_pp",
            "dpmpp_2m_sde",
            "dpmpp_2m_sde_gpu",
            "dpmpp_3m_sde",
            "dpmpp_3m_sde_gpu",
            "ddpm",
            "lcm",
            "ipndm",
            "ipndm_v",
            "deis",
            "ddim",
            "uni_pc",
            "uni_pc_bh2"
          ],
          {
            "tooltip": "The algorithm used when sampling, this can affect the quality, speed, and style of the generated output."
          }
        ],
        "scheduler": [
          [
            "normal",
            "karras",
            "exponential",
            "sgm_uniform",
            "simple",
            "ddim_uniform",
            "beta",
            "linear_quadratic"
          ],
          {
            "tooltip": "The scheduler controls how noise is gradually removed to form the image."
          }
        ],
        "positive": [
          "CONDITIONING",
          {
            "tooltip": "The conditioning describing the attributes you want to include in the image."
          }
        ],
        "negative": [
          "CONDITIONING",
          {
            "tooltip": "The conditioning describing the attributes you want to exclude from the image."
          }
        ],
        "latent_image": [
          "LATENT",
          {
            "tooltip": "The latent image to denoise."
          }
        ],
        "denoise": [
          "FLOAT",
          {
            "default": 1.0,
            "min": 0.0,
            "max": 1.0,
            "step": 0.01,
            "tooltip": "The amount of denoising applied, lower values will maintain the structure of the initial image allowing for image to image sampling."
          }
        ]
      }
    },
    "input_order": {
      "required": [
        "model",
        "seed",
        "steps",
        "cfg",
        "sampler_name",
        "scheduler",
        "positive",
        "negative",
        "latent_image",
        "denoise"
      ]
    },
    "output": [
      "LATENT"
    ],
    "output_is_list": [
      false
    ],
    "output_name": [
      "LATENT"
    ],
    "name": "KSampler",
    "display_name": "KSampler",
    "description": "Uses the provided model, positive and negative conditioning to denoise the latent image.",
    "python_module": "nodes",
    "category": "sampling",
    "output_node": false,
    "output_tooltips": [
      "The denoised latent."
    ]
  }
}`

async function initializeNodeInfo(nodename, nodeInfo){
    const exists = await NodeInfoCollection.find({name:nodename}).countAsync();
    if ( !exists ){
        console.log(nodename, nodeInfo)
        if (nodeInfo[nodename]) {
            const _id = await NodeInfoCollection.insertAsync(nodeInfo[nodename])
            console.log(_id)
        
        } else {
            throw Error(`cant find ${nodename} in ${nodeInfo}`);
        }
        
    }
}

Meteor.startup(async () => {
    // await initializeNodeInfo("KSampler", JSON.parse(nodeInfoKsampler));
    
})


/*

{
    _id:"e131231312"
    classType:"classname"

}



*/