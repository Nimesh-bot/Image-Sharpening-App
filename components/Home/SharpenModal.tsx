import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

import { Ionicons } from "@expo/vector-icons";

import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { IModalProps } from "../../@types/modal";
import { BASE_URL } from "../../config/axios.config";
import useProcessImage from "../../hooks/useProcessImage";
import useReProcessImage from "../../hooks/useReProcessImage";
import { getResults } from "../../redux/apiSlice";

const globalStyles = require("../../styles/global");
const imageWidth = Dimensions.get("window").width - 50;

const SharpenModal = ({ modalVisible, closeModal, image }: IModalProps) => {
  const [sharpened, setSharpened] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);
  const [folderName, setFolderName] = React.useState<any>(null);

  const [filterModal, setFilterModal] = React.useState(false);
  const [filters, setFilters] = React.useState({
    kernelMatrixWidth: 5,
    kernelMatrixHeight: 5,
    sigmaX: 2,
    sigmaY: 2,
    contributionOriginalImage: 7.5,
    contributionBlurryImage: -6.5,
    gamma: 0,
  });

  const dispatch = useDispatch();

  const handleSuccess = (data: any) => {
    console.log("data: ", data.data);
    Toast.show({
      type: "success",
      text1: "Image Sharpened",
    });
    setSharpened(true);
    setResult(data.data.sharpened_path);
    setFolderName(data.data.id);
    dispatch(getResults() as any);
  };
  const handleError = (error: any) => {
    console.log(error);
    Toast.show({
      type: "error",
      text1: "Something went wrong. Please try again",
    });
  };

  const { mutate, isLoading } = useProcessImage(handleSuccess, handleError);
  const { mutate: reMutate, isLoading: reIsLoading } = useReProcessImage(
    handleSuccess,
    handleError
  );

  const onSubmit = () => {
    console.log("baseUrl", BASE_URL);
    console.log("payload", filters);
    const formData: any = new FormData();
    formData.append("file", image);
    formData.append(
      "kernelMatrixWidth",
      parseInt(filters.kernelMatrixWidth.toString())
    );
    formData.append(
      "kernelMatrixHeight",
      parseInt(filters.kernelMatrixHeight.toString())
    );
    formData.append("sigmaX", parseFloat(filters.sigmaX.toString()));
    formData.append("sigmaY", parseFloat(filters.sigmaY.toString()));
    formData.append(
      "contributionOriginalImage",
      parseFloat(filters.contributionOriginalImage.toString())
    );
    formData.append(
      "contributionBlurryImage",
      parseFloat(filters.contributionBlurryImage.toString())
    );
    formData.append("gamma", parseFloat(filters.gamma.toString()));
    formData.append("base_url", BASE_URL);

    mutate(formData);
  };

  const onReSharpen = () => {
    console.log("here");
    setResult(null);
    const formData: any = new FormData();
    formData.append("old_sharpened_image_folder", String(result.split("/")[4]));
    formData.append(
      "kernelMatrixWidth",
      parseInt(filters.kernelMatrixWidth.toString())
    );
    formData.append(
      "kernelMatrixHeight",
      parseInt(filters.kernelMatrixHeight.toString())
    );
    formData.append("sigmaX", parseFloat(filters.sigmaX.toString()));
    formData.append("sigmaY", parseFloat(filters.sigmaY.toString()));
    formData.append(
      "contributionOriginalImage",
      parseFloat(filters.contributionOriginalImage.toString())
    );
    formData.append(
      "contributionBlurryImage",
      parseFloat(filters.contributionBlurryImage.toString())
    );
    formData.append("gamma", parseFloat(filters.gamma.toString()));
    formData.append("base_url", BASE_URL);

    console.log("payload: ", formData, result);

    reMutate(formData);
  };

  const handleDownload = () => {
    const uri = "http://techslides.com/demos/sample-videos/small.mp4";
    let fileUri = FileSystem.documentDirectory + "small.mp4";
    FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        saveFile(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveFile = async (fileUri: string) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };

  // const handleDeleteSuccess = (data: any) => {
  //   dispatch(getResults() as any);
  // };

  // const handleDeleteError = (error: any) => {
  //   console.log(error);
  // };

  // const { mutate: deleteMutate } = useDeleteRecord(
  //   handleDeleteSuccess,
  //   handleDeleteError
  // );

  // const handleClose = () => {
  //   // deleteMutate(folderName);
  //   closeModal;
  // };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={globalStyles.container}>
            <View style={globalStyles.header}>
              <Text style={globalStyles.headingText}>Sharpen</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <TouchableOpacity onPress={handleDownload}>
                  <Ionicons name="download-outline" size={24} color="black" />
                </TouchableOpacity> */}
                <View></View>
                <TouchableOpacity onPress={closeModal}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View></View>
            <View style={{ marginVertical: 40 }}>
              {sharpened && <Text>Original Image</Text>}
              <Image source={image} style={styles.image} />
            </View>
            {sharpened && (
              <View style={{ marginVertical: 40 }}>
                <Text>Sharpened Image</Text>
                <Image source={{ uri: result }} style={styles.image} />
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ width: "35%" }}>
                <TouchableOpacity
                  style={styles.outlineButton}
                  onPress={() => setFilterModal(true)}
                >
                  <Text style={styles.outlineButtonText}>Filters</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: "60%" }}>
                {!sharpened ? (
                  <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    {isLoading ? (
                      <Text style={styles.buttonText}>Processing...</Text>
                    ) : (
                      <Text style={styles.buttonText}>Sharpen</Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.button} onPress={onReSharpen}>
                    {reIsLoading ? (
                      <Text style={styles.buttonText}>Processing...</Text>
                    ) : (
                      <Text style={styles.buttonText}>Re-Sharpen</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>

      {filterModal && (
        <FilterModal
          filterModalVisible={filterModal}
          toggleFilterModal={() => setFilterModal(!filterModal)}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </>
  );
};

export default SharpenModal;

const styles = StyleSheet.create({
  image: {
    width: imageWidth,
    height: "auto",
    aspectRatio: 1,
    borderRadius: 14,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#1E56A0",
    padding: 14,
    borderRadius: 10,
  },
  outlineButton: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1E56A0",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  outlineButtonText: {
    color: "#1E56A0",
    textAlign: "center",
    fontSize: 16,
  },
  filterModal: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    width: Dimensions.get("window").width - 50,
    maxHeight: Dimensions.get("window").height - 100,
  },
  filterBackdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface IFilterModal {
  filterModalVisible: boolean;
  toggleFilterModal: () => void;
  filters: IFilters;
  setFilters: any;
}

const FilterModal = ({
  filterModalVisible,
  toggleFilterModal,
  filters,
  setFilters,
}: IFilterModal) => {
  const revert = () => {
    setFilters({
      kernelMatrixWidth: 3,
      kernelMatrixHeight: 3,
      sigmaX: 2,
      sigmaY: 2,
      contributionOriginalImage: 0,
      contributionBlurryImage: 0,
      gamma: 0,
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={toggleFilterModal}
    >
      <View style={styles.filterBackdrop}>
        <View style={styles.filterModal}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={globalStyles.subHeadingText}>Apply Filters</Text>
            <TouchableOpacity onPress={toggleFilterModal}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 40 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <View>
                <Text style={{ marginBottom: 4, opacity: 0.6, fontSize: 11 }}>
                  Kernel Matrix Width
                </Text>
                <TextInput
                  style={globalStyles.textInputStyle}
                  onChangeText={(text) =>
                    setFilters({ ...filters, kernelMatrixWidth: text })
                  }
                  value={String(filters.kernelMatrixWidth)}
                  keyboardType="number-pad"
                />
              </View>
              <View>
                <Text style={{ marginBottom: 4, opacity: 0.6, fontSize: 11 }}>
                  Kernel Matrix Height
                </Text>
                <TextInput
                  style={globalStyles.textInputStyle}
                  onChangeText={(text) =>
                    setFilters({ ...filters, kernelMatrixHeight: text })
                  }
                  value={String(filters.kernelMatrixHeight)}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <View>
                <Text style={{ marginBottom: 4, opacity: 0.6, fontSize: 11 }}>
                  SigmaX
                </Text>
                <TextInput
                  style={globalStyles.textInputStyle}
                  onChangeText={(text) =>
                    setFilters({ ...filters, sigmaX: text })
                  }
                  value={String(filters.sigmaX)}
                  keyboardType="number-pad"
                />
              </View>
              <View>
                <Text style={{ marginBottom: 4, opacity: 0.6, fontSize: 11 }}>
                  SigmaY
                </Text>
                <TextInput
                  style={globalStyles.textInputStyle}
                  onChangeText={(text) =>
                    setFilters({ ...filters, sigmaY: text })
                  }
                  value={String(filters.sigmaY)}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            {/* <View style={{ marginBottom: 15 }}>
              <Text style={{ marginBottom: 4, opacity: 0.6, fontSize: 11 }}>
                Contribution of Original Image
              </Text>
              <TextInput
                style={globalStyles.textInputStyle}
                onChangeText={(text) =>
                  setFilters({ ...filters, contributionOriginalImage: text })
                }
                value={String(filters.contributionOriginalImage)}
                keyboardType="number-pad"
              />
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ marginBottom: 4, opacity: 0.6, fontSize: 11 }}>
                Contribution of Blurry Image
              </Text>
              <TextInput
                style={globalStyles.textInputStyle}
                onChangeText={(text) =>
                  setFilters({ ...filters, contributionBlurryImage: text })
                }
                value={String(filters.contributionBlurryImage)}
                keyboardType="number-pad"
              />
            </View> */}
            <View>
              <Text style={{ marginBottom: 4, opacity: 0.6, fontSize: 11 }}>
                Gamma (Additional Brightness)
              </Text>
              <TextInput
                style={globalStyles.textInputStyle}
                onChangeText={(text) => setFilters({ ...filters, gamma: text })}
                value={String(filters.gamma)}
                keyboardType="number-pad"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 40,
              }}
            >
              <View style={{ width: "60%" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleFilterModal}
                >
                  <Text style={styles.buttonText}>Apply and Close</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: "35%" }}>
                <TouchableOpacity style={styles.outlineButton} onPress={revert}>
                  <Text style={styles.outlineButtonText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
