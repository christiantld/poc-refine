import { MantineEditInferencer } from "@refinedev/inferencer/mantine";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { TextInput } from "@mantine/core";

export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        getInputProps,
        saveButtonProps,
        setFieldValue,
        refineCore: { queryResult },
    } = useForm({
        initialValues: { id: "", name: "" },
    });

    const produtosData = queryResult?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps} title="Editar">
            <TextInput mt="sm" label="Name" {...getInputProps("name")} />
        </Edit>
    );
};
export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ProductEdit