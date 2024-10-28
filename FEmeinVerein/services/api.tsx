import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";
import { template } from "@babel/core";
const API_URL = "http://192.168.1.102:1337";
const API_URL_WIDGET = "https://api.fupa.net";
const TEAMNAME_FUPA = "fv-salia-sechtem-m1";

export const fetchArticles = async (locale?: string, limit?: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/neuigkeiten?populate=*&sort[0]=id:desc&pagination[limit]=3`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchArticlesKategorie = async (
  locale: string,
  kategorie: string,
  limit: string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/neuigkeiten?populate=*&sort[0]=id:desc&pagination[limit]=3`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEilmeldung = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/eilmeldung?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchArticleById = async (id: any, locale: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/neuigkeiten/${id}?populate=*`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchArticleByDate = async (id: any, locale: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/neuigkeiten/${id}?populate=*`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStandingsPreview = async (teamname: any, type?: any) => {
  const isLifetime = await checkLifetime("standingspre-" + teamname);
  if (isLifetime) {
    try {
      const response = await axios.get(
        `${API_URL_WIDGET}/v1/widget/teams/${teamname}/standings-teaser`
      );
      storeData(response.data, "standingspre-" + teamname);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    try {
      const data = await getData("standingspre-" + teamname);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export const getStandingsFull = async (teamname: any, type?: any) => {
  const isLifetime = await checkLifetime("standings-" + teamname);
  if (isLifetime) {
    try {
      const response = await axios.get(
        `${API_URL_WIDGET}/v1/widget/teams/${teamname}/standings`
      );
      storeData(response.data, "standings-" + teamname);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    try {
      const data = await getData("standings-" + teamname);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export const getTeamFull = async (teamname: any, type?: any) => {
  const isLifetime = await checkLifetime("squad-" + teamname);
  if (isLifetime) {
    try {
      const response = await axios.get(
        `${API_URL_WIDGET}/v1/widget/teams/${teamname}/squad`
      );
      storeData(response.data, "squad-" + teamname);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    try {
      const data = await getData("squad-" + teamname);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
export const getTeamImage = async (teamname: any) => {
  try {
    const data = await getData("squad-" + teamname);
    return data.teamImage.path;
  } catch (error) {
    try {
      const response = await axios.get(
        `${API_URL_WIDGET}/v1/widget/teams/${teamname}/squad`
      );
      storeData(response.data, "squad-" + teamname);
      return response.data.teamImage.path;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
export const storeData = (data: any, teamname: any) => {
  const storeData = {
    timestamp: Date.now(),
    data: data,
  };
  AsyncStorage.setItem(teamname, JSON.stringify(storeData));
};

async function getData(teamname: any) {
  const value = await AsyncStorage.getItem(teamname);
  if (value !== null) {
    const parsedData = JSON.parse(value);
    return parsedData.data;
  } else {
    return false;
  }
}

async function checkLifetime(teamname: any) {
  try {
    const value = await AsyncStorage.getItem(teamname);

    if (value !== null) {
      const parsedData = JSON.parse(value);
      let now: any = new Date();
      let createdAt: any = new Date(parsedData.timestamp);
      var oneDay = 120 * 60 * 60 * 1000;
      if (now - createdAt > oneDay) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } catch (e) {
    console.log("error");
  }
}
