import { Log } from 'meteor/logging';
import { WorkflowsCollection } from "/imports/api/workflows/collections";

export const initializeWorkflows = async () => {
  // Check if the WorkflowsCollection is empty
  const workflowCount = await WorkflowsCollection.find().countAsync();
  if (workflowCount === 0) {
    // If the collection is empty, insert the default workflow
    const promptText = `
    {
      "3": {
          "class_type": "KSampler",
          "inputs": {
              "cfg": 8,
              "denoise": 1,
              "latent_image": [
                  "5",
                  0
              ],
              "model": [
                  "4",
                  0
              ],
              "negative": [
                  "7",
                  0
              ],
              "positive": [
                  "6",
                  0
              ],
              "sampler_name": "euler",
              "scheduler": "normal",
              "seed": 8566257,
              "steps": 20
          }
      },
      "4": {
          "class_type": "CheckpointLoaderSimple",
          "inputs": {
              "ckpt_name": "v1-5-pruned-emaonly.ckpt"
          }
      },
      "5": {
          "class_type": "EmptyLatentImage",
          "inputs": {
              "batch_size": 1,
              "height": 512,
              "width": 512
          }
      },
      "6": {
          "class_type": "CLIPTextEncode",
          "inputs": {
              "clip": [
                  "4",
                  1
              ],
              "text": "masterpiece best quality girl"
          }
      },
      "7": {
          "class_type": "CLIPTextEncode",
          "inputs": {
              "clip": [
                  "4",
                  1
              ],
              "text": "bad hands"
          }
      },
      "8": {
          "class_type": "VAEDecode",
          "inputs": {
              "samples": [
                  "3",
                  0
              ],
              "vae": [
                  "4",
                  2
              ]
          }
      },
      "9": {
          "class_type": "SaveImage",
          "inputs": {
              "filename_prefix": "ComfyUI",
              "images": [
                  "8",
                  0
              ]
          }
      }
    }`;

    try {
      const workflow = JSON.parse(promptText);
      await WorkflowsCollection.insertAsync({ workflow, name: 'Default Workflow' });
      Log.info('Default workflow inserted into the collection');
    } catch (error) {
      Log.error(`Error inserting default workflow: ${error}`);
    }
  }
};